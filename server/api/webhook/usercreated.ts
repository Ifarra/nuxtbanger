// server/api/webhook.js

import { createClient } from '@supabase/supabase-js';
import { Webhook } from 'svix';

const config = useRuntimeConfig()

const supabaseUrl = config.public.supabase_url as string;
const supabaseKey = config.public.clerk_private as string;
const supabase = createClient(supabaseUrl, supabaseKey)

const webhookSecret = config.public.clerk_webhook as string;

export default defineEventHandler(async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  };
  setHeaders(event, headers);

  // Handle preflight requests
  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204; // No Content
    return;
  }

  const payload = await readRawBody(event);
  const svixHeaders = event.node.req.headers as Record<string, string>;

  const webhook = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = webhook.verify(payload as string, svixHeaders);
  } catch (error) {
    return {
      statusCode: 401,
      body: { message: 'Invalid signature' },
    };
  }

  const { id } = evt.data;
  const eventType = evt.type;

  const attributes = evt.data as Record<string, any>

  if (eventType === 'user.created') {
    console.log(`User ${id} was ${eventType}`);

    const { first_name, last_name, image_url } = attributes as {first_name:string, last_name: string, image_url:string};

    const userName = `${first_name} ${last_name}`; // Combine names for userName
    const userId = id; // Use Clerk's user ID
    const profileUrl = image_url|| null; // Optional profile picture URL

    const { error } = await supabase
      .from('users')
      .insert([{
        "userId": userId,
        "userName": userName,
        "profileUrl": profileUrl,
      }]);

    if (error) {
      console.error('Error saving user to database:', error);
      return {
        statusCode: 500,
        body: { message: 'Failed to save user' },
      };
    }

    console.log('User saved to database');
  }

  return {
    statusCode: 200,
    body: { success: true, message: 'Webhook received' },
  };
});