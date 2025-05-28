
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';
import LoginForm from './LoginForm';
import Dashboard from '../pages/Dashboard';

const AuthWrapper = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthWrapper: Setting up auth listeners...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthWrapper: Initial session check:', session ? 'User logged in' : 'No user');
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AuthWrapper: Auth state changed:', _event, session ? 'User logged in' : 'No user');
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    console.log('AuthWrapper: Rendering LoginForm');
    return <LoginForm />;
  }

  console.log('AuthWrapper: User authenticated, rendering Dashboard');
  return <Dashboard />;
};

export default AuthWrapper;
