import { createClient } from '@supabase/supabase-js';

interface Picture {
  u_id: string;
  u_name: string;
  picture_url: string;
  publicity: string;
}

interface RequestBody {
  image_link: string;
  account?:string;
}

export default defineEventHandler(async (event) => {
  const res = event.node.res;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  }
  setHeaders(event, headers)

    // Handle preflight requests
    if (event.node.req.method === 'OPTIONS') {
      event.node.res.statusCode = 204; // No Content
      return;
    }

  const body = await readBody<RequestBody>(event);
  const config = useRuntimeConfig();
  const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
  
  // Check if image_link is provided
  if (!body.image_link) {
    res.statusCode = 400; // Bad Request
    return { statusCode: res.statusCode, body: JSON.stringify({ error: 'Image link is required' }) };
  }

  if (body.account == 'astolfo'){
    const { data, error } = await supabase.from('pictures').insert<Picture>([{
      u_id: 'user_2p3KdYl30s2yIHyyvPdIhq1otLQ',
      u_name: 'astolfo cute',
      picture_url: body.image_link,
      publicity: 'private'
    }]);

    if (error) {
      console.error(error);
      res.statusCode = 500; // Internal Server Error
      return { statusCode: res.statusCode, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  } else {
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
  }
  res.statusCode = 200; // OK
  return
});