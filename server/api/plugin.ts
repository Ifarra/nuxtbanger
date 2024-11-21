// Suggested code may be subject to a license. Learn more: ~LicenseLog:4287540398.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3606775416.
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
    'Access-Control-Allow-Origin': '*', // Replace with the actual origin of your frontend
    'Access-Control-Allow-Methods': 'POST', // Add allowed methods if needed
    'Access-Control-Allow-Headers': 'Content-Type', // Add allowed headers if needed
    'Access-Control-Allow-Credentials': 'true', // Set to true if you need to include cookies or authorization headers
    // ... other headers if needed
    'X-XSS-Protection': 1
  }
  setHeaders(event, headers)

  const body = await readBody<RequestBody>(event);
  const config = useRuntimeConfig();
  const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
  
  // Check if image_link is provided
  if (!body.image_link) {
    res.statusCode = 400; // Bad Request
    return { statusCode: res.statusCode, body: JSON.stringify({ error: 'Image link is required' }) };
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
    return { statusCode: res.statusCode, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }

  res.statusCode = 200; // OK
  return { statusCode: res.statusCode, body: JSON.stringify({ message: 'Picture uploaded successfully' }) };
});