export default defineEventHandler(async (event) => {
    const res = event.node.res;
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    setHeaders(event, headers);
  
    // Handle preflight requests
    if (event.node.req.method === 'OPTIONS') {
      res.statusCode = 204; // No Content
      return;
    }
  
    // Extracting u_id from the URL
    const { u_id } = event.context.params; // Assuming 'u_id' is in the URL
  
    // Validate that u_id is provided
    if (!u_id) {
      res.statusCode = 400; // Bad Request
      return { statusCode: res.statusCode, body: JSON.stringify({ error: 'User ID is required' }) };
    }
  
    // Fetch user data from Clerk API
    const config = useRuntimeConfig();
    const response = await fetch(`https://cors.redoc.ly/https://api.clerk.com/v1/users?user_id=${u_id}`, {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US,en;q=0.9,id;q=0.8,ja;q=0.7',
          'Authorization': `Bearer ${config.public.clerk_private}`,
          'Connection': 'keep-alive',
          'Host': 'cors.redoc.ly',
          'Origin': 'https://clerk.com',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Edg/131.0.0.0',
          'Accept': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"'
        }
      });
  
    // Check for response errors
    if (!response.ok) {
      res.statusCode = response.status; // Set the response status from the error
      return { statusCode: res.statusCode, body: JSON.stringify({ error: `HTTP error! status: ${response.status}` }) };
    }
  
    const data = await response.json();
  
    // Return user data if available
    if (data && data.length > 0) {
      res.statusCode = 200; 
      return data[0].image_url;
    }
  
    // If no data found
    res.statusCode = 404; // Not Found
    return { statusCode: res.statusCode, body: JSON.stringify({ error: 'No user data found' }) };
  });