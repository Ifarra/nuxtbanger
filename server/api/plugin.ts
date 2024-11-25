import { createClient } from '@supabase/supabase-js';

interface Picture {
  userId: string;
  imageTitle: string;
  imageDescription: string;
  imageUrl: string;
  imagePublicity: string;
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
    const { data, error } = await supabase.from('images').insert<Picture>([{
      userId: 'user_2pI70FL5xombMLWvmPlWQfP0NdV',
      imageTitle: 'Archived Imgae',
      imageDescription: 'No description :3',
      imageUrl: body.image_link,
      imagePublicity: 'private'
    }]);

    if (error) {
      console.error(error);
      res.statusCode = 500; // Internal Server Error
      return { statusCode: res.statusCode, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  } else {
    const { data, error } = await supabase.from('images').insert<Picture>([{
      userId: 'user_2pIdR9pl8sUFDNPjHtNvzfORLPX',
      imageTitle: 'Daily Post',
      imageDescription: 'No description :3',
      imageUrl: body.image_link,
      imagePublicity: 'public'
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