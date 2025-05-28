
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  unit: string;
}

const ProductList = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log('ProductList: Fetching products...');
      console.log('ProductList: Supabase URL:', supabase.supabaseUrl);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      console.log('ProductList: Raw response data:', data);
      console.log('ProductList: Raw response error:', error);
      
      if (error) {
        console.error('ProductList: Error fetching products:', error);
        throw error;
      }
      
      console.log('ProductList: Fetched products:', data?.length || 0, 'items');
      return data as Product[];
    }
  });

  console.log('ProductList: Current state - isLoading:', isLoading, 'error:', error, 'products:', products);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('ProductList: Render error:', error);
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-red-600">
            <p>Error loading products: {(error as Error).message}</p>
            <p className="text-sm mt-2">Check console for details</p>
            <p className="text-xs mt-2">Supabase URL: {supabase.supabaseUrl}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span>Product List ({products?.length || 0} items)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {products && products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No products found</p>
            <p className="text-sm text-gray-500 mt-2">
              Database might be empty or there could be a connection issue
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Connected to: {supabase.supabaseUrl}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
