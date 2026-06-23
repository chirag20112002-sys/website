import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Server-side client with service role — never expose to browser
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
