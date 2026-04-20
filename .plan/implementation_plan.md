# CMS Implementation Plan

## Overview

Implementation plan for adding a headless CMS (Decap CMS) to the Hugo blog with Cloudflare Pages deployment.

---

## Open Questions

1.  **RESOLVED**: Hosting platform → Cloudflare Pages
2.  **RESOLVED**: Authentication → GitHub OAuth
3.  **RESOLVED**: Editorial workflow → Enabled
4.  **RESOLVED**: Media management → Full media library with page bundles
5.  **RESOLVED**: Repository setup → **Private repo**: `gerolori/gerosalorenzo.com-dev` (editing, CMS target) | **Public repo**: `gerolori/gerosalorenzo.com` (Cloudflare builds from, auto-mirrored via GitHub Action)
6.  **RESOLVED**: Cloudflare Worker deployment → Same repository (private repo) for simplicity
7.  **RESOLVED**: CMS access → Single-user setup (only owner needs access)

---

## Architecture

### Repository Strategy

- **Private repo** (`gerolori/gerosalorenzo.com-dev`):
  - Contains all content including drafts
  - CMS commits here
  - GitHub Actions workflows for mirroring
  - Configuration files (including CMS config)

- **Public repo** (`gerolori/gerosalorenzo.com`):
  - Cloudflare Pages builds from this repo
  - Auto-mirrored from private repo via GitHub Action
  - Excludes: drafts, `.git`, `.github`, `public/`

### CMS Configuration

The `config.yml` backend should point to the **private repo**:

```yaml
backend:
  name: github
  repo: gerolori/gerosalorenzo-dev  # Private repo - CMS commits here
  branch: main
```

### Deployment Flow

```
[CMS Editor] → [Private Repo] → [GitHub Action] → [Public Repo] → [Cloudflare Pages]
```

---

## Notes

- **2026-03-04**: Repository architecture clarified - CMS edits private repo `gerolori/gerosalorenzo.com-dev`, GitHub Action mirrors to public repo `gerolori/gerosalorenzo.com` (excludes drafts, .git, .github, public). Cloudflare Pages builds from public repo. This means config.yml should point to private repo for backend.repo. User reference: Hugo repo structure article in drafts folder.
