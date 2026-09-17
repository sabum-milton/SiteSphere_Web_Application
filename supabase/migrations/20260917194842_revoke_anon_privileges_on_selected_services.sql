/*
  # Remove residual anon privileges on selected_services

  1. Changes
  - Revoke every table privilege on `selected_services` from the `anon` role.

  2. Security
  - All policies on this table target `authenticated` and are own-row scoped.
    The anonymous role held SELECT/INSERT/UPDATE/DELETE with no legitimate use.
  - Privileges held by `authenticated` (including the column-scoped UPDATE
    added earlier) are untouched.
*/

REVOKE ALL ON TABLE selected_services FROM anon;
