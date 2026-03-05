// Cloudflare Pages Function: /api/auth/callback
// Exchanges OAuth code for GitHub access token

export async function onRequestGet(context) {
  const { request, env } = context;
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = env;
  
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return new Response('Missing GitHub OAuth credentials', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('Missing code parameter', { 
      status: 400,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });
  
  const data = await tokenResponse.json();
  
  if (data.error) {
    return new Response(JSON.stringify(data), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Return token to auth callback page (not directly to /admin)
  // The callback page will use postMessage to send token to CMS popup opener
  const callbackUrl = new URL('https://gerosalorenzo.com/admin/auth-callback.html');
  callbackUrl.hash = `access_token=${data.access_token}&token_type=${data.token_type}`;
  
  return Response.redirect(callbackUrl.toString(), 302);
}
