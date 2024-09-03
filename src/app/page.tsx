'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { Onboarding } from '@/components/onboarding';
import { Login } from '@/components/login';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [session, setSession] = useState<any>(null); // Use any or the correct type for session
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
        } else {
          console.log('Current session:', session);
          setSession(session);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    }

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe(); // Correctly unsubscribe from the subscription
    };
  }, []);

  const renderContent = () => {
    if (!hasCompletedOnboarding) {
      return <Onboarding onComplete={handleCompleteOnboarding} />;
    } else if (!session) {
      return <Login />;
    } else {
      return <AppShell />;
    }
  };

  return (
    <main>
      {renderContent()}
    </main>
  );
}
