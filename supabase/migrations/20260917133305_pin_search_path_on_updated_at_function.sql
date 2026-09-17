/*
  # Pin search_path on the updated_at trigger function

  1. Security
  - `public.update_updated_at_column()` had a mutable search_path, flagged by
    the database linter. Set an explicit search_path so name resolution inside
    the function body cannot be influenced by the caller's settings.
  - Behaviour is unchanged: the function still stamps NEW.updated_at with now().
*/

ALTER FUNCTION public.update_updated_at_column() SET search_path = public, pg_temp;
