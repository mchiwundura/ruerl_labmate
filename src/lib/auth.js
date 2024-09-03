// src/utils/auth.js
import { supabase } from './supabaseClient';

export async function signInWithEmail(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return user;
}
