# Documentation Site

This is the public-facing repository for my documentation site. Content is written and managed in a private repository, then automatically published here.

## How It Works

I write posts in a private repo where I can keep drafts and work-in-progress content. When ready, GitHub Actions automatically syncs published content to this public repository. The site then deploys to Cloudflare Pages.

**Private Repo → GitHub Actions → Public Repo (this one) → Cloudflare Pages**

### Why a Private Repo?

- Keep drafts and incomplete work private
- Control exactly what gets published
- Maintain a clean public repository with only finished content

### The Sync Process

The private repository contains a `content/posts/drafts/` folder for work-in-progress posts. This folder is excluded in the private repo's `.gitignore`, so those files never make it into the git history. When GitHub Actions runs, it:

1. Filters the repository content
2. Excludes the drafts folder entirely  
3. Pushes only published posts to this public repo
4. Cloudflare Pages picks up the changes and rebuilds the site

This way, incomplete or draft content stays private and never leaks to the public repository.

## Repository Structure

```
├── archetypes/          # Templates for new posts
│   └── default.md       
├── content/             
│   └── posts/           # Published blog posts
├── layouts/             
│   └── shortcodes/      # Custom Hugo shortcodes
├── static/              
│   └── favicon_logo/    
├── themes/              
│   └── PaperMod/        # Theme (included directly, not as submodule)
├── rafts/               # Hugo build output
└── hugo.yaml            # Site configuration
```

### Key Directories

**content/posts/** - Published posts that have been synced from the private repo. Each post lives in its own folder named `YYYY-MM-DD-slug/` with an `index.md` file.

**themes/PaperMod/** - The theme is committed directly to this repo rather than referenced as a git submodule. Makes it easier to customize and ensures the repo is self-contained.

**rafts/** - Where Hugo outputs the built site. This is what gets deployed to Cloudflare Pages.

## Local Development

```bash
# Start the development server
hugo server -D

# Builds the site and watches for changes
# Available at http://localhost:1313
```

The `-D` flag includes draft posts (useful when working in the private repo).

## Building for Production

```bash
# Build the site
hugo -d rafts

# Outputs to the rafts/ directory
```

Hugo processes all the Markdown files, applies the theme, and generates a complete static site ready to deploy.

## Cloudflare Pages Deployment

Cloudflare Pages automatically builds and deploys the site when changes are pushed to this repo.

### Build Configuration

Set in the Cloudflare Pages dashboard:

- **Framework preset**: Hugo
- **Build command**: `hugo -d rafts`
- **Build output directory**: `rafts`
- **Environment variables**: 
  - `HUGO_VERSION=0.151.0` (or whatever version you're using)

### Deployment Flow

1. Content syncs from private repo to this public repo via GitHub Actions
2. Cloudflare Pages detects the push
3. Runs `hugo -d rafts` to build the site
4. Deploys to their edge network
5. Site is live at the custom domain

Every push to main triggers a production deployment. Pull requests get preview URLs.

## Tech Stack

- Hugo (static site generator)
- PaperMod theme
- Cloudflare Pages (hosting)
- GitHub Actions (automated publishing from private repo)

## Why Static?

Static sites have some real advantages:

- **Fast**: No database queries, no server-side processing. Just static files served from a CDN.
- **Secure**: No server to hack, no database to compromise, no PHP vulnerabilities.
- **Simple**: Write in Markdown, commit, and it's live. No CMS to maintain.
- **Cheap**: Free hosting on Cloudflare Pages with unlimited bandwidth.
- **Reliable**: Static files are easy to cache and serve. Hard to mess up.

The content lives in git, which means full version history and easy backups. No database dumps or server migrations needed.
