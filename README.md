# Hugo Static Site with Cloudflare Pages

A modern static documentation site built with Hugo and deployed on Cloudflare Pages, featuring automated builds and global CDN distribution.

## Architecture Overview

This repository contains a static site generator setup that transforms Markdown content into a fully functional, fast-loading website. The architecture follows the JAMstack pattern (JavaScript, APIs, and Markup), leveraging static site generation for optimal performance and security.

### Technology Stack

- **Static Site Generator**: Hugo (extended version)
- **Theme**: PaperMod - A fast, clean, and responsive Hugo theme
- **Deployment Platform**: Cloudflare Pages
- **Version Control**: Git/GitHub
- **Content Format**: Markdown with YAML front matter
- **Configuration**: YAML-based configuration

### Key Components

1. **Content Layer**: Markdown files organized in a content directory structure
2. **Presentation Layer**: Hugo templates and theme customization
3. **Build Layer**: Hugo static site generator
4. **Distribution Layer**: Cloudflare Pages global CDN

## Repository Structure

```
.
├── archetypes/          # Content templates for new posts
│   └── default.md       # Default archetype with front matter template
├── content/             # All site content in Markdown
│   └── posts/           # Blog posts and articles
│       └── YYYY-MM-DD-slug/
│           └── index.md # Individual post content
├── layouts/             # Custom layout overrides
│   └── shortcodes/      # Custom Hugo shortcodes
├── static/              # Static assets (images, fonts, etc.)
│   └── favicon_logo/    # Site favicon and icons
├── themes/              # Hugo themes
│   └── PaperMod/        # PaperMod theme files
├── rafts/               # Build output directory (generated)
├── hugo.yaml            # Main Hugo configuration file
└── .hugo_build.lock     # Hugo build lock file
```

### Directory Breakdown

#### `content/`
Contains all site content organized hierarchically. Each post is typically stored in its own directory using the format `YYYY-MM-DD-title-slug/index.md`, allowing for page bundles with co-located resources.

#### `archetypes/`
Template files for generating new content. The `default.md` archetype provides a structured template with predefined front matter fields that are automatically populated when creating new posts via `hugo new`.

#### `layouts/`
Custom layout files that override or extend theme templates. Currently contains:
- `shortcodes/`: Custom Hugo shortcodes for reusable content components

#### `static/`
Files in this directory are copied directly to the site root during build. Includes:
- Favicon files
- Static images
- Other assets that don't require processing

#### `themes/PaperMod/`
The PaperMod theme provides the visual design and layout templates. This theme is included directly in the repository (not as a submodule), enabling full customization.

#### `rafts/`
Generated build output directory containing the complete static website ready for deployment. This directory is created by running `hugo` or `hugo server` and contains:
- Compiled HTML files
- Processed CSS and JavaScript
- Optimized assets
- RSS feeds and sitemaps

## Hugo Configuration

The site is configured through `hugo.yaml`, which defines:

- **Base URL**: Production URL where the site will be hosted
- **Theme**: PaperMod theme activation
- **Build Settings**: Draft, future, and expired content handling
- **Minification**: HTML, CSS, and JavaScript optimization
- **Content Parameters**: 
  - Reading time calculation
  - Social sharing buttons
  - Table of contents generation
  - Code copy buttons
  - Breadcrumb navigation
- **SEO Settings**: Robots.txt, meta tags, social media integration
- **Navigation**: Menu structure and site navigation
- **Permalinks**: URL structure for posts and pages

## Build Process

### Local Development

1. **Prerequisites**:
   ```bash
   # Hugo Extended version required
   hugo version
   ```

2. **Development Server**:
   ```bash
   # Start local development server
   hugo server -D
   
   # Server will be available at http://localhost:1313
   # Live reload enabled - changes are reflected instantly
   ```

3. **Build for Production**:
   ```bash
   # Generate static site in /rafts directory
   hugo -d rafts
   
   # With minification (configured in hugo.yaml)
   hugo --minify -d rafts
   ```

### Build Pipeline

1. **Content Processing**: Hugo reads Markdown files from `content/` directory
2. **Template Rendering**: Content is rendered using layouts from theme and custom layouts
3. **Asset Processing**: CSS, JavaScript, and images are processed and optimized
4. **Static Generation**: Complete static website is generated in the output directory
5. **Optimization**: Minification and optimization of HTML, CSS, and JavaScript (if enabled)

### Build Output Structure

The `rafts/` directory contains:
```
rafts/
├── index.html              # Homepage
├── posts/                  # Generated post pages
│   └── slug/
│       └── index.html
├── categories/             # Category taxonomy pages
├── tags/                   # Tag taxonomy pages
├── assets/                 # Processed CSS and JS
├── favicon_logo/           # Copied static assets
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
└── index.xml              # RSS feed
```

## Cloudflare Pages Deployment

### Overview

Cloudflare Pages provides a JAMstack platform that automatically builds and deploys the site from the Git repository. It offers:

- **Global CDN**: Content distributed across 275+ edge locations worldwide
- **Automatic HTTPS**: Free SSL certificates with automatic renewal
- **Instant Rollbacks**: One-click rollback to any previous deployment
- **Preview Deployments**: Every pull request gets its own preview URL
- **Unlimited Bandwidth**: No data transfer limits
- **DDoS Protection**: Built-in security at the edge

### Deployment Architecture

```
GitHub Repository → Cloudflare Pages Build → Edge Network Distribution
                         ↓
                    Hugo Build Process
                         ↓
                    Static Files Generated
                         ↓
                    Deployed to Edge Network
                         ↓
                    Available Globally
```

### Cloudflare Pages Configuration

#### Build Settings

When connecting the repository to Cloudflare Pages, configure:

- **Framework Preset**: Hugo
- **Build Command**: `hugo --minify -d rafts` or `hugo -d rafts`
- **Build Output Directory**: `rafts`
- **Root Directory**: `/` (repository root)
- **Environment Variables**:
  ```
  HUGO_VERSION=0.151.0 (or latest)
  HUGO_ENV=production
  ```

#### Advanced Build Configuration

For optimal builds, you can set additional environment variables:

```bash
# Hugo version specification
HUGO_VERSION=0.151.0

# Environment (affects draft content, analytics, etc.)
HUGO_ENV=production

# Enable extended Hugo features (SCSS processing, etc.)
# Cloudflare Pages automatically uses Hugo Extended
```

### Deployment Workflow

1. **Push to Repository**: 
   - Code changes pushed to main/production branch
   - Or pull request created

2. **Automatic Build Trigger**:
   - Cloudflare Pages detects the push
   - Initiates build process

3. **Build Execution**:
   - Spins up build environment
   - Installs Hugo (version specified in environment variables)
   - Executes build command: `hugo -d rafts`
   - Validates build output

4. **Deployment**:
   - Static files uploaded to Cloudflare's edge network
   - Content distributed to 275+ data centers globally
   - DNS records automatically updated (if using Cloudflare DNS)

5. **Preview Deployments** (for pull requests):
   - Each PR gets a unique preview URL
   - Format: `<commit-hash>.docu.pages.dev`
   - Allows testing before merging to production

6. **Production Deployment**:
   - Main branch changes deploy to production URL
   - Previous version remains available for instant rollback
   - Zero downtime deployment

### Custom Domain Configuration

1. **Add Custom Domain** in Cloudflare Pages dashboard:
   - Navigate to project settings → Custom domains
   - Add domain: `docu.gerosalorenzo.com`

2. **DNS Configuration** (if domain uses Cloudflare DNS):
   - Automatic CNAME record creation
   - Points to Cloudflare Pages deployment

3. **SSL/TLS**:
   - Automatic SSL certificate provisioning
   - Forced HTTPS redirect
   - HTTP Strict Transport Security (HSTS) available

### Edge Network Features

- **Smart Routing**: Requests routed to nearest edge location
- **Caching**: Static content cached at the edge
- **Compression**: Automatic Brotli/Gzip compression
- **HTTP/2 & HTTP/3**: Modern protocol support
- **IPv6**: Full IPv6 support

## Development Workflow

### Creating New Content

```bash
# Create new post using archetype template
hugo new content/posts/YYYY-MM-DD-title-slug/index.md

# Edit the created Markdown file
# Update front matter (title, date, tags, etc.)
# Write content in Markdown

# Preview locally
hugo server -D
```

### Front Matter Structure

Each post includes YAML front matter:

```yaml
---
title: "Post Title"
date: 2024-01-01T12:00:00+00:00
tags: ["tag1", "tag2"]
draft: false
showToc: true
TocOpen: false
description: "Post description"
---
```

### Git Workflow

```bash
# 1. Create content or make changes
# 2. Test locally
hugo server -D

# 3. Commit changes
git add .
git commit -m "Add new post: title"

# 4. Push to GitHub
git push origin main

# 5. Cloudflare Pages automatically builds and deploys
```

### Deployment Stages

- **Development**: `hugo server -D` - Local development with drafts
- **Staging**: Pull request branches - Preview deployments on Cloudflare Pages
- **Production**: Main branch - Production deployment to custom domain

## Performance Optimizations

### Build-Time Optimizations

1. **Minification**: HTML, CSS, and JavaScript minification enabled in `hugo.yaml`
2. **Asset Processing**: Images and assets optimized during build
3. **Code Splitting**: CSS and JS split by page for optimal loading

### Runtime Optimizations

1. **CDN Distribution**: Content served from nearest edge location
2. **HTTP/2**: Multiplexed connections for faster loading
3. **Brotli Compression**: Better compression than Gzip
4. **Resource Hints**: Preload, prefetch, and preconnect hints
5. **Lazy Loading**: Images and resources loaded on demand

### Caching Strategy

- **Static Assets**: Long-term caching with immutable URLs
- **HTML Pages**: Short cache with revalidation
- **Edge Caching**: Cloudflare Pages intelligent caching at edge locations

## Monitoring and Analytics

### Cloudflare Analytics

Available in Cloudflare Pages dashboard:
- Page views and unique visitors
- Geographic distribution
- Top pages and referrers
- Performance metrics (time to first byte, etc.)
- Bot traffic filtering

### Build Monitoring

- Build logs available in Cloudflare Pages dashboard
- Build history with timestamps and commit information
- Failed build notifications
- Build duration tracking

## Maintenance and Updates

### Hugo Updates

To update Hugo version:

1. Update local Hugo installation
2. Test build locally
3. Update `HUGO_VERSION` environment variable in Cloudflare Pages
4. Deploy and verify

### Theme Updates

The PaperMod theme is included directly in the repository:

```bash
# To update theme:
# 1. Backup current theme
# 2. Download latest PaperMod release
# 3. Replace files in themes/PaperMod/
# 4. Test locally
# 5. Commit and deploy
```

### Dependency Management

- No external dependencies required for content authors
- Hugo and theme are self-contained
- Cloudflare Pages handles all deployment dependencies

## Rollback Procedures

### Via Cloudflare Pages Dashboard

1. Navigate to project → Deployments
2. View deployment history
3. Click "Rollback" on any previous deployment
4. Instant rollback with zero downtime

### Via Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit (use with caution)
git reset --hard <commit-hash>
git push origin main --force
```

## Troubleshooting

### Build Failures

1. **Check build logs** in Cloudflare Pages dashboard
2. **Verify Hugo version** matches local development
3. **Validate configuration** in hugo.yaml
4. **Check content front matter** for syntax errors
5. **Test build locally** with same Hugo version

### Common Issues

- **Build timeout**: Large sites may need optimization or asset reduction
- **Theme not found**: Ensure theme is present in themes/ directory
- **Broken links**: Use Hugo's built-in link checker
- **Missing pages**: Check draft status and publishDate in front matter

## Security Considerations

- **Static Content**: No server-side code execution reduces attack surface
- **HTTPS Only**: All traffic encrypted with automatic SSL
- **DDoS Protection**: Cloudflare's enterprise-grade DDoS mitigation
- **No Database**: Eliminates SQL injection and database vulnerabilities
- **Content Security**: All content reviewed before deployment via Git workflow

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit pull request
5. Review preview deployment
6. Merge to main after approval

## License

This repository structure and deployment configuration can be used as a reference for similar Hugo + Cloudflare Pages projects.

## Additional Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo PaperMod Theme](https://github.com/adityatelange/hugo-PaperMod)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [JAMstack Architecture](https://jamstack.org/)
- [Markdown Guide](https://www.markdownguide.org/)
