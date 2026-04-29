import { createClient } from '@supabase/supabase-js';
import type { Package } from '../data/store';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helpers
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

// Packages CRUD
export async function getPackagesFromSupabase(): Promise<Package[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
  
  return data?.map(pkg => ({
    ...pkg,
    products: pkg.products || [],
    features: pkg.features || [],
  })) || [];
}

export async function createPackageInSupabase(pkg: Omit<Package, 'id' | 'createdAt'>): Promise<Package | null> {
  const { data, error } = await supabase
    .from('packages')
    .insert([{
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      old_price: pkg.oldPrice,
      category: pkg.category,
      image: pkg.image,
      products: pkg.products,
      badge: pkg.badge,
      is_popular: pkg.isPopular,
      features: pkg.features,
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating package:', error);
    return null;
  }
  
  return {
    ...data,
    oldPrice: data.old_price,
    isPopular: data.is_popular,
    products: data.products || [],
    features: data.features || [],
  };
}

export async function updatePackageInSupabase(id: string, updates: Partial<Package>): Promise<Package | null> {
  const { data, error } = await supabase
    .from('packages')
    .update({
      name: updates.name,
      description: updates.description,
      price: updates.price,
      old_price: updates.oldPrice,
      category: updates.category,
      image: updates.image,
      products: updates.products,
      badge: updates.badge,
      is_popular: updates.isPopular,
      features: updates.features,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating package:', error);
    return null;
  }
  
  return {
    ...data,
    oldPrice: data.old_price,
    isPopular: data.is_popular,
    products: data.products || [],
    features: data.features || [],
  };
}

export async function deletePackageFromSupabase(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting package:', error);
    return false;
  }
  
  return true;
}
