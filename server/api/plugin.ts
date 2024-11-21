// Suggested code may be subject to a license. Learn more: ~LicenseLog:263038114.
import { createClient } from '@supabase/supabase-js';

interface Picture {
  u_id: string;
  u_name: string;
  picture_url: string;
  publicity: string;
}

interface RequestBody {
  image_link: string;
}

export default defineEventHandler(async (event) => {
  const res = event.node.res;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'crossOriginResourcePolicy': 'same-origin',
    'crossOriginOpenerPolicy': 'same-origin',
    'crossOriginEmbedderPolicy': 'require-corp',
    'contentSecurityPolicy': "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    'X-XSS-Protection': 1
  }
  setHeaders(event, headers)

  const body = await readBody<RequestBody>(event);
  const config = useRuntimeConfig();
  const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
  
  // Check if image_link is provided
  if (!body.image_link) {
    res.statusCode = 400; // Bad Request
    return send(event, JSON.stringify({ error: 'Image link is required' }));
    
  }

  const { data, error } = await supabase.from('pictures').insert<Picture>([{
    u_id: 'user_2p3KdYl30s2yIHyyvPdIhq1otLQ',
    u_name: 'admin',
    picture_url: body.image_link,
    publicity: 'public'
  }]);

  if (error) {
    console.error(error);
    res.statusCode = 500; // Internal Server Error
    return send(event, JSON.stringify({ error: 'Internal Server Error' }));
  }

  res.statusCode = 200; // OK
  return send(event, JSON.stringify({ message: 'Picture uploaded successfully' }));
});