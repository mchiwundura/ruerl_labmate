'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { signInWithEmail } from '@/lib/auth';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      console.log('User logged in:', user);
      // Handle successful login (e.g., redirect or update state)
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'
      }`}
    >
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">RUERL</h1>
          <h2 className="mt-6 text-2xl font-semibold">
            {isLogin ? 'Welcome Back' : 'Sign Up'}
          </h2>
          <p className="mt-2 text-sm">
            {isLogin ? 'Enter your credentials to login' : 'Create your account'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            className={`w-full ${isDarkMode ? 'bg-input-dark' : 'bg-input-light'} text-text-light`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isLogin && (
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full ${isDarkMode ? 'bg-input-dark' : 'bg-input-light'} text-text-light`}
            />
          )}
          <Input
            type="password"
            placeholder="Password"
            className={`w-full ${isDarkMode ? 'bg-input-dark' : 'bg-input-light'} text-text-light`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`w-full ${isDarkMode ? 'bg-input-dark' : 'bg-input-light'} text-text-light`}
            />
          )}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-primary hover:underline focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
