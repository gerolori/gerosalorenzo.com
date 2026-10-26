---
title: Privacy notice
date: 2026-10-26
lastmod: 2026-10-26
draft: false
---

_Last updated: 26 October 2026._

This notice describes the processing connected to the public pages at `gerosalorenzo.com`, the `/admin` editor route, and the `grlo.me` redirect domain. It is based on the code in this repository and on the service documentation I can verify. Settings in external dashboards can change what is processed. This is a personal/portfolio site notice, not a claim of compliance with every country's laws. Some account-level Cloudflare settings still need to be verified; they are identified below.

## Who is responsible

Lorenzo Gerosa is responsible for the processing described in this notice (controller). Contact: [dev@gerosalorenzo.com](mailto:dev@gerosalorenzo.com).

## Public pages, hosting, and request logs

The public blog has no visitor accounts, comments, or online contact form. The public templates and scripts used for the site do not include a Google Analytics tag, a Cloudflare Web Analytics beacon, or an advertising or client-side traffic-analytics tag. (The `docs/` folder contains only an example Web Analytics snippet; it is not deployed.) Cloudflare's dashboard can still enable Web Analytics or additional security features independently of this repository, so that observation describes the site code, not the account settings. I have not inspected those dashboard settings.

When a browser requests a page, Cloudflare, which provides the site's CDN/hosting and serverless platform, necessarily receives the IP address and standard request/connection metadata. This can include the requested path and query string, request time, browser/user-agent, and referrer information where supplied. This data is used to deliver and route the site and to protect its reliability and security, including abuse prevention. For visitor request data that Cloudflare exposes to customers as "Customer Logs", I am the controller and Cloudflare acts as processor under its [Data Processing Addendum](https://www.cloudflare.com/cloudflare-customer-dpa/). Separately from that processor role, Cloudflare may also process data as an independent controller for its own network, security, and account purposes, as described in its [Privacy Policy](https://www.cloudflare.com/privacypolicy/). My legal basis for operating and securing the public site is my legitimate interest (GDPR Article 6(1)(f)).

Cloudflare's general [Privacy Policy](https://www.cloudflare.com/privacypolicy/) defines Customer Logs and ties retention to its business purposes and legal obligations; it does not give one fixed numeric retention period for all request data. Product-specific rules differ. Legacy Enterprise [Logpull](https://developers.cloudflare.com/logs/logpull/understanding-the-basics/), if enabled, makes request logs queryable for at least 3 and up to 7 days. [Logpush](https://developers.cloudflare.com/logs/logpush/) does not store logs itself; retention is controlled by the destination configured for the job. This repository does not configure those products, and I have not verified the account's Logpull, Logpush, or retention configuration. The exact retention for this deployment therefore cannot be inferred from the repository source. I do not claim that Cloudflare keeps no logs.

Cloudflare may process data in the United States and other countries. Its current policy describes the Data Privacy Framework and Standard Contractual Clauses as applicable transfer safeguards. See [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/) and [DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) for current terms.

## Cookies, browser storage, and search

The repository configures no analytics or advertising cookies. Cloudflare can set security-related cookies depending on the zone's dashboard settings, for example bot-management or challenge cookies. I therefore do not claim that the site sets no cookies at all; the actual Cloudflare zone settings should be verified before treating this notice as complete.

The public theme switch stores your chosen light/dark appearance in first-party browser `localStorage` under `pref-theme` after you use the toggle. It is used only to restore that display choice and remains until you clear this site's browser storage. It is not an analytics or advertising identifier and is not a cookie.

Site search downloads a same-site search index (`index.json`) and runs in your browser; it does not send each keystroke to an external search provider. The search term is reflected in the page URL and may remain in browser history. If you directly load or reload a URL containing a search term, that URL, including its query string, is part of the request Cloudflare receives.

## Images, the editor, and external resources

The home page currently loads my profile image directly from GitHub (`github.com/gerolori.png`), so GitHub receives a request and may receive your IP address and ordinary request metadata when that image is loaded. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).

`/admin` is a public, `noindex` page, but it is intended for site editors, not ordinary visitors. Anyone can reach the endpoint; access to the repository and its content is controlled by GitHub repository permissions. If someone opens `/admin` and chooses to sign in, Decap CMS starts a GitHub OAuth flow through Cloudflare Pages Functions at `/api/auth`. As coded, that flow requests the GitHub `repo` scope, which is broad repository-level access; the precise access actually granted is governed by GitHub and by the authorization the person gives, and it is not limited to an administrator role. GitHub authenticates the person, and the callback function exchanges the OAuth code for a GitHub access token and returns it in the URL fragment of a callback page; that page then passes the token to Decap CMS. Decap CMS can retain the token/session in browser storage so an authenticated editor remains signed in, and the repository's validation checklist expects logout to clear the token. The `/admin` page loads assets from Netlify Identity (Netlify), unpkg (Decap CMS), and jsDelivr (responsive CSS); those providers receive browser requests when the admin page is opened. These editor resources are not loaded on ordinary blog pages. See the [Netlify privacy statement](https://www.netlify.com/privacy/) and [jsDelivr privacy policy](https://www.jsdelivr.com/terms/privacy-policy). GitHub and Cloudflare process the authentication requests under their own notices linked above.

Ordinary links to YouTube, Reddit, Google, GitHub, LinkedIn, or other sites do not load those sites merely because the blog page is viewed; your browser connects to them when you follow a link. External sites then apply their own privacy terms. The GitHub-hosted profile image and `/admin` resources above are exceptions because they load directly.

## Shortcut and redirect domain

The home page's "View CV" button points to `https://grlo.me/ld`. The repository documents `grlo.me` as a domain I own and describes a Cloudflare Worker that forwards paths on it to the same path on this site; the site's own link configuration labels `/ld` as LinkedIn and `/gh` as GitHub. The expected CV flow is therefore `grlo.me/ld` → `gerosalorenzo.com/ld` → LinkedIn, while `/gh` is the GitHub shortcut rather than a CV link. Because the redirect rules live outside this repository, the deployed destination should be verified. If you follow such a link, Cloudflare's redirect service receives ordinary request metadata such as your IP address, requested path and query, time, user-agent, and referrer where supplied, and forwards your browser toward the destination. The destination then applies its own privacy policy. This notice covers processing by this site and by this redirect, not the independent processing of whatever destination you reach.

## Email and contact

The site offers a `mailto:` link to [work@gerosalorenzo.com](mailto:work@gerosalorenzo.com), not a web form. The repository describes the documented custom-domain mail setup as Cloudflare Email Routing forwarding to Gmail. If the current routing differs, the providers involved may differ, and I will correct this notice. In the documented setup, Cloudflare and Google process the message as mail providers; see the [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/) and [Google privacy policy](https://policies.google.com/privacy).

If you email me, I receive your email address and whatever message or attachments you send, and use them to respond or handle the matter you raised. For general correspondence and replies, the legal basis is my legitimate interest in responding (GDPR Article 6(1)(f)). If your message asks me to take specific steps before a possible professional engagement, processing needed to take those requested pre-contract steps is based on Article 6(1)(b). I keep correspondence only as long as needed to handle it and to meet any applicable legal obligations. Please do not send sensitive information unnecessarily.

## Your rights

If the GDPR applies, you may request access, correction, deletion, restriction, portability where applicable, or object to processing based on legitimate interests. Contact me at the address above. You may also complain to the Italian Data Protection Authority ([Garante](https://www.garanteprivacy.it/)). Additional rights may apply under the law where you live.

## Changes

I will update this page if the site's data practices change. Recheck this notice if analytics, forms, comments, embedded media, advertising, or other third-party tools are added. Before publication, I also need to verify the Cloudflare account's Web Analytics, security-feature, and logging/retention settings and update this notice if they change what is processed.
