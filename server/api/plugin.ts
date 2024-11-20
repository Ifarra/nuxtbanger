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
  const body = await readBody<RequestBody>(event);
  const config = useRuntimeConfig();
  const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
  
  // Check if image_link is provided
  if (!body.image_link) {
    return send(event, 400, JSON.stringify({ error: 'Image link is required' })); // Bad Request
  }

  const { data, error } = await supabase.from('pictures').insert<Picture>([{
    u_id: 'user_2p3KdYl30s2yIHyyvPdIhq1otLQ',
    u_name: 'admin',
    picture_url: body.image_link,
    publicity: 'public'
  }]);

  if (error) {
    console.error(error);
    return send(event, JSON.stringify({ error: 'Internal Server Error' })); // Internal Server Error
  }

  return send(event, JSON.stringify({ message: 'Picture uploaded successfully' }));
});