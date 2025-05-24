
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  unit: string;
}

interface Supplier {
  id: number;
  name: string;
  contact_info: string;
}

const AddPriceForm = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    supplier_id: '',
    price: ''
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Product[];
    }
  });

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Supplier[];
    }
  });

  const addPriceMutation = useMutation({
    mutationFn: async (priceData: { product_id: number; supplier_id: number; price: number }) => {
      const { data, error } = await supabase
        .from('prices')
        .insert([priceData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Price added successfully!",
        description: "The price has been recorded in the database.",
      });
      setFormData({ product_id: '', supplier_id: '', price: '' });
      queryClient.invalidateQueries({ queryKey: ['prices'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add price",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.product_id || !formData.supplier_id || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price greater than 0",
        variant: "destructive",
      });
      return;
    }

    addPriceMutation.mutate({
      product_id: parseInt(formData.product_id),
      supplier_id: parseInt(formData.supplier_id),
      price: price
    });
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New Price</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select
              value={formData.product_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, product_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} ({product.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select
              value={formData.supplier_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, supplier_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers?.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={addPriceMutation.isPending}
          >
            {addPriceMutation.isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Price...</span>
              </div>
            ) : (
              'Add Price'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPriceForm;
