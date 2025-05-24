
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface PriceData {
  id: number;
  price: number;
  recorded_at: string;
  product_id: number;
  supplier_id: number;
  products?: { name: string };
  suppliers?: { name: string };
}

const PriceTrends = () => {
  const { data: priceData, isLoading, error } = useQuery({
    queryKey: ['price-trends'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prices')
        .select(`
          *,
          products(name),
          suppliers(name)
        `)
        .order('recorded_at', { ascending: true });
      
      if (error) throw error;
      return data as PriceData[];
    }
  });

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
  };

  // Group data by product for chart display
  const getChartData = () => {
    if (!priceData) return [];
    
    return priceData.map(item => ({
      date: new Date(item.recorded_at).toLocaleDateString(),
      price: item.price,
      product: item.products?.name || 'Unknown Product',
      supplier: item.suppliers?.name || 'Unknown Supplier'
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading price trends...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-red-600">
            <p>Error loading price trends: {(error as Error).message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = getChartData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Price Trends Over Time</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[400px]">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="var(--color-price)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-price)" }}
                />
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No price data available for trends</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Price Records</CardTitle>
        </CardHeader>
        <CardContent>
          {priceData && priceData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Supplier</th>
                    <th className="text-right p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.slice(-10).reverse().map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">
                        {new Date(item.recorded_at).toLocaleDateString()}
                      </td>
                      <td className="p-2">{item.products?.name || 'N/A'}</td>
                      <td className="p-2">{item.suppliers?.name || 'N/A'}</td>
                      <td className="p-2 text-right font-medium">
                        ${item.price?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No price records found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceTrends;
