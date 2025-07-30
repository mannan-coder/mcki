-- Fix security warning: Set search_path for function to prevent search path attacks
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;