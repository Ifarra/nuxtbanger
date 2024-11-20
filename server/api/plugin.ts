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
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

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