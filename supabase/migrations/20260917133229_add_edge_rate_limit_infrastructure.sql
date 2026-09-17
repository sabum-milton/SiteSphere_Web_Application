/*
  # Server-side rate limiting for public edge function submissions

  1. New Tables
  - `edge_rate_limits`
    - `bucket_key` (text, primary key) — opaque hash of action + client IP
    - `window_start` (timestamptz) — start of the current counting window
    - `hits` (integer) — requests counted in the current window

  2. New Functions
  - `consume_rate_limit(p_key text, p_limit int, p_window_seconds int)`
    returns boolean. SECURITY DEFINER with a fixed search_path. Performs an
    atomic INSERT ... ON CONFLICT DO UPDATE so two concurrent callers cannot
    both pass the check. Returns true when the request is allowed.

  3. Security
  - RLS enabled on `edge_rate_limits` with no policies: unreachable from the
    Data API for anon and authenticated.
  - EXECUTE on `consume_rate_limit` revoked from PUBLIC, anon and authenticated;
    only the service role (used by the edge function) may call it.
*/

CREATE TABLE IF NOT EXISTS edge_rate_limits (
  bucket_key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  hits integer NOT NULL DEFAULT 0
);

ALTER TABLE edge_rate_limits ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE edge_rate_limits FROM anon;
REVOKE ALL ON TABLE edge_rate_limits FROM authenticated;

CREATE OR REPLACE FUNCTION consume_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_hits integer;
BEGIN
  IF p_key IS NULL OR length(p_key) = 0 THEN
    RETURN false;
  END IF;

  INSERT INTO edge_rate_limits (bucket_key, window_start, hits)
  VALUES (p_key, now(), 1)
  ON CONFLICT (bucket_key) DO UPDATE
    SET hits = CASE
          WHEN edge_rate_limits.window_start < now() - make_interval(secs => p_window_seconds)
            THEN 1
          ELSE edge_rate_limits.hits + 1
        END,
        window_start = CASE
          WHEN edge_rate_limits.window_start < now() - make_interval(secs => p_window_seconds)
            THEN now()
          ELSE edge_rate_limits.window_start
        END
  RETURNING hits INTO v_hits;

  RETURN v_hits <= p_limit;
END;
$$;

REVOKE ALL ON FUNCTION consume_rate_limit(text, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION consume_rate_limit(text, integer, integer) FROM anon;
REVOKE ALL ON FUNCTION consume_rate_limit(text, integer, integer) FROM authenticated;
