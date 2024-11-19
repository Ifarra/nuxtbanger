import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()

const supabaseUrl =config.public.supabase_url
const supabaseAnonKey = config.public.supabase_key

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default (context, inject) => {
    inject('supabase', supabase)
  }