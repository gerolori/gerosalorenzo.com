# OAuth Proxy Worker

Cloudflare Worker for handling GitHub OAuth with Decap CMS.

## Setup

1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Set secret: `wrangler secret put GITHUB_CLIENT_SECRET`
4. Deploy: `wrangler deploy`

## Endpoints

- `/api/auth` - Redirects to GitHub OAuth
- `/api/auth/callback` - Handles OAuth callback

## Environment Variables

Set in Cloudflare Workers dashboard:
- `GITHUB_CLIENT_ID` - From GitHub OAuth app
- `GITHUB_CLIENT_SECRET` - From GitHub OAuth app (secret)
