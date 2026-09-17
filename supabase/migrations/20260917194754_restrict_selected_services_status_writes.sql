/*
  # Make selected_services.status server-controlled

  1. Changes
  - Revoke table-wide UPDATE on `selected_services` from `authenticated`.
  - Re-grant UPDATE only on the user-content columns (`service_name`, `service_type`).

  2. Security
  - The existing row-level UPDATE policy still restricts a user to their own rows.
  - `status` (the operator workflow field) can no longer be written from the
    browser, so a customer cannot mark their own request as in_progress or
    completed. SELECT is untouched, so existing reads keep working.
*/

REVOKE UPDATE ON TABLE selected_services FROM authenticated;
GRANT UPDATE (service_name, service_type) ON TABLE selected_services TO authenticated;
