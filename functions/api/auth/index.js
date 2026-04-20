// Cloudflare Pages Function: /api/auth
// Initiates GitHub OAuth flow

export async function onRequestGet(context) {
  const { GITHUB_CLIENT_ID } = context.env;
  
  if (!GITHUB_CLIENT_ID) {
    return new Response('Missing GITHUB_CLIENT_ID environment variable', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  const redirectUri = 'https://gerosalorenzo.com/api/auth/callback';
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.set('scope', 'repo');
  
  return Response.redirect(githubAuthUrl.toString(), 302);
}
