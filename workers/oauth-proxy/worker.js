export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://gerosalorenzo.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // OAuth callback endpoint
    if (url.pathname === '/api/auth/callback') {
      const code = url.searchParams.get('code')

      if (!code) {
        return new Response('Missing code parameter', { status: 400 })
      }

      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      })

      const data = await tokenResponse.json()

      if (data.error) {
        return new Response(JSON.stringify(data), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Return token to CMS
      return new Response(JSON.stringify({
        token: data.access_token,
        provider: 'github'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Auth endpoint (redirect to GitHub)
    if (url.pathname === '/api/auth') {
      const redirectUri = `https://gerosalorenzo.com/api/auth/callback`
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`

      return Response.redirect(githubAuthUrl, 302)
    }

    return new Response('Not found', { status: 404 })
  }
}
