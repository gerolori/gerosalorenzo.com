# Cloudflare Pages Functions

This directory contains [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) that run alongside the static site.

## OAuth Authentication Functions

Located in `api/auth/`, these functions handle GitHub OAuth for Decap CMS:

- **`/api/auth`** (`index.js`) - Initiates OAuth flow, redirects to GitHub
- **`/api/auth/callback`** (`callback.js`) - Receives OAuth code, exchanges for token

### How It Works

1. User clicks "Login with GitHub" in Decap CMS at `/admin`
2. CMS redirects to `/api/auth`
3. Function redirects to GitHub authorization page
4. User authorizes, GitHub redirects to `/api/auth/callback?code=...`
5. Function exchanges code for access token
6. Function redirects back to CMS with token in URL fragment

### Environment Variables Required

Configure these in Cloudflare Pages Dashboard → Settings → Environment Variables:

- `GITHUB_CLIENT_ID` - OAuth App Client ID
- `GITHUB_CLIENT_SECRET` - OAuth App Client Secret (encrypted)

Set for both **Production** and **Preview** environments.

### Deployment

Functions are automatically deployed when you push to the repository:

1. GitHub Action mirrors to public repo
2. Cloudflare Pages detects changes
3. Functions are built and deployed alongside static site

No separate Worker deployment needed!

### Routing Priority

Cloudflare Pages Functions have routing priority:

1. **Functions** (`/functions`) - Highest priority
2. **Static Assets** (`/static` or `/public`) - Lower priority

This means `/api/auth` will always hit the function, never a static file.

### Testing

After deployment:

```bash
# Check auth redirect
curl -I "https://gerosalorenzo.com/api/auth"
# Should return: 302 Found, Location: https://github.com/login/oauth/authorize?...

# Check callback (requires valid code)
curl -I "https://gerosalorenzo.com/api/auth/callback?code=test"
# Should return: 400 Bad Request (invalid code) or 302 (valid code)
```

### Migration from Worker

This replaces the previous `workers/oauth-proxy` Worker deployment. Benefits:

-  Simpler deployment (just git push)
-  No separate Worker management
-  No routing conflicts (Functions have priority)
-  Environment variables in Pages dashboard
-  Unified logs and analytics

### References

- [Pages Functions Documentation](https://developers.cloudflare.com/pages/functions/)
- [Pages Functions Routing](https://developers.cloudflare.com/pages/functions/routing/)
- [Decap CMS OAuth Backend](https://decapcms.org/docs/external-oauth-clients/)
