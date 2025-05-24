
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import AddPriceForm from '../components/AddPriceForm';
import PriceTrends from '../components/PriceTrends';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, TrendingUp, LogOut } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">Price Tracker</h1>
              
              <div className="flex space-x-4">
                <Link to="/dashboard">
                  <Button 
                    variant={isActivePath('/dashboard') ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Package className="h-4 w-4" />
                    <span>Products</span>
                  </Button>
                </Link>
                
                <Link to="/dashboard/add-price">
                  <Button 
                    variant={isActivePath('/dashboard/add-price') ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Price</span>
                  </Button>
                </Link>
                
                <Link to="/dashboard/trends">
                  <Button 
                    variant={isActivePath('/dashboard/trends') ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Price Trends</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <Button 
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-price" element={<AddPriceForm />} />
          <Route path="/trends" element={<PriceTrends />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
