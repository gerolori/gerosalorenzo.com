# GeroSalorenzo.com Development Repository

Private repository for content management and development of [gerosalorenzo.com](https://gerosalorenzo.com).

## Repository Structure

```
docu/
├── static/admin/          # Decap CMS configuration
│   ├── index.html         # CMS interface
│   └── config.yml         # CMS configuration
├── workers/oauth-proxy/   # Cloudflare Worker for OAuth
├── content/               # Hugo content (managed by CMS)
│   ├── blog/              # Blog posts
│   ├── series/            # Series pages
│   └── about/             # About page
├── docs/                  # Documentation
│   ├── cms-setup.md       # Setup instructions
│   ├── cms-testing.md     # Testing guide
│   └── cms-development.md # Developer guide
└── themes/PaperMod/       # Hugo theme
```

## Content Management

This repository uses [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) for content management.

### Local Development

1. **Start Hugo server:**
   ```bash
   hugo server -D
   ```

2. **Start Decap server:**
   ```bash
   npx decap-server
   ```

3. **Access CMS:**
   - URL: `http://localhost:1313/admin`
   - No authentication required in local mode

### Production Access

- **CMS URL**: `https://gerosalorenzo.com/admin`
- **Authentication**: GitHub OAuth
- **Workflow**: Editorial workflow with review process

## Publishing Workflow

1. **Create/Edit Content** → Status: Draft
2. **Review** → Status: In Review
3. **Approve** → Status: Ready
4. **Publish** → Merges to main, triggers build

## Architecture

### Data Flow

```
CMS (Browser) → GitHub OAuth → Cloudflare Worker
    ↓
GitHub API → Private Repo (this repo)
    ↓
GitHub Action → Public Repo
    ↓
Cloudflare Pages → Production Site
```

### Key Components

- **Decap CMS**: Content management interface
- **Cloudflare Worker**: OAuth authentication proxy
- **GitHub Actions**: Automated deployment
- **Cloudflare Pages**: Static site hosting
- **Hugo**: Static site generator

## Documentation

- [CMS Setup Guide](docs/cms-setup.md) - Initial setup and configuration
- [CMS Testing Guide](docs/cms-testing.md) - Testing procedures
- [CMS Development Guide](docs/cms-development.md) - Developer documentation

## Quick Start

### Prerequisites

- Node.js 18+ (for decap-server)
- Hugo 0.147.0+
- Git

### Setup

1. Clone repository:
   ```bash
   git clone https://github.com/gerolori/gerosalorenzo.com-dev.git
   cd gerosalorenzo.com-dev
   ```

2. Install decap-server:
   ```bash
   npm install -g decap-server
   ```

3. Start development:
   ```bash
   hugo server -D
   npx decap-server
   ```

4. Access CMS at `http://localhost:1313/admin`

## Configuration

### CMS Configuration

Located in `static/admin/config.yml`:
- Blog posts collection with all Hugo frontmatter fields
- Series collection for multi-part content
- Pages collection for static pages
- Editorial workflow enabled
- Media storage in page bundles

### Hugo Configuration

Located in `hugo.yml`:
- Theme: PaperMod
- Base URL: `https://gerosalorenzo.com`
- Build drafts in development mode

## Deployment

### Automatic Deployment

1. Content published via CMS
2. GitHub Action triggered
3. Content synced to public repo
4. Cloudflare Pages builds and deploys

### Manual Deployment

```bash
hugo --minify
# Output in public/ directory
```

## Support

For issues or questions:
- Check [CMS Testing Guide](docs/cms-testing.md) for common issues
- Review [CMS Development Guide](docs/cms-development.md) for technical details
- Consult [Decap CMS Documentation](https://decapcms.org/docs/)

## License

Content in this repository is private and managed via CMS.

Public site content is deployed to [gerosalorenzo.com](https://gerosalorenzo.com).
