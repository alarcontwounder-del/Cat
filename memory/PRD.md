# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, matching GIM (golfinmallorca.com) designs.

## GIM Matching Approach (LOCKED)
1. Pull exact source code from golfinmallorca.com using Playwright
2. Build standalone mockup for approval
3. Only deploy after user confirms

## Implemented Features
- 20 courses with flip cards, individual SEO pages with Schema.org GolfCourse data
- 6 hotels with flip cards (pink back), individual hotel cards
- Full multilingual: EN, ES, CA, DE, FR, SE
- Public blog at /blog (3 posts), individual post pages
- Course comparison tool at /compare (slope, rating, difficulty, designer)
- 8 SEO landing pages (Barcelona, Costa Brava, Girona, Tarragona, Katalonien, UK, Luxury, Stay & Play)
- Cookie consent: EXACT GIM code
- Worldwide banner: EXACT GIM code
- Google OAuth admin login
- Admin panel: Content Manager (Golf Courses + Hotels tabs), Blog Posts
- Privacy Policy + Terms of Service (adapted from GIM, GDPR compliant)
- Mobile hamburger menu with full navigation
- SEO sitemap (37 URLs)
- Scroll animations, hover lift effects
- Navbar: pink (#f6416c) links, glass dropdowns, separator bar

## Architecture
Frontend: React + Tailwind + Lucide | Backend: FastAPI + MongoDB | Weather: open-meteo.com

## Color Palette
- #CCFF00 (Electric Kiwi - primary, navbar bg)
- #f6416c (Logo Pink - text, accents, hotel card backs)
- #FFFF00 (Yellow - CTA gradient)
- #DFFF00 (Light Kiwi - hover states)
- #1a1a1a (Near Black - footer, buttons)

## Completed (29 Mar 2026)
- Privacy & Terms pages (GIM text adapted for Catalunya, GDPR)
- Mobile hamburger menu with drawer navigation
- OG:image meta tags for social sharing
- Favicon from logo
- Course card "Hover for details" hidden on mobile
- Admin page title fixed
- Mockup files cleaned up
- Compact glass dropdowns (Option B) with white text

## Completed (May 2026) — Production Hardening + .com Migration
- PWA: manifest.json, sw.js service worker, install banner (multi-lang, sessionStorage)
- Google Analytics G-1S0JC9TYJC + custom events (pwa_install_*, book_tee_time_click)
- Pruned 42 legacy GIM frontend files
- Code quality: removed eval/exec in backend, useMemo around Contexts, stable React keys
- Resend transactional emails (Contact + Hotel Quote)
- Programmatic SEO landing pages + dynamic XML sitemap
- Domain migration .es → .com (code-level):
  - 21 hardcoded URLs updated (canonical, hreflang, og:url, twitter, schema.org Organization+Website+TravelAgency, sitemap, robots)
  - All mailto: contact@golfgatecatalunya.com (Privacy, Terms, Contact, Hotel pages)
  - Footer copyright "Golfgatecatalunya.com®"
  - Admin panel branding
  - Email templates (Resend) - admin + client variants
  - Backend 301 path-preserving middleware (Host: .es → 301 .com)
  - Frontend JS redirect in <head> (instant client-side .es → .com)
  - SITE_URL env default → https://golfgatecatalunya.com

## Pending (Blocked on External)
- Emergent Support: link `golfgatecatalunya.com` as additional custom domain (currently only .es is linked; platform supports 1 domain by default — user emailed support requesting both linked simultaneously)
- Resend Domains: verify `golfgatecatalunya.com` (add SPF/DKIM records in Arsys) → then update SENDER_EMAIL Secret from .es to .com
- After both above done: edit SITE_URL Secret in Emergent → https://golfgatecatalunya.com → Redeploy → verify .es returns 301 via curl

## Future Backlog (P2)
- Replace hero image once user provides a specific one
- Prune unused legacy GIM endpoints in server.py (get_restaurants, send_trip_planner_email)
- Update favicon with PWA black background design
- Cloudflare bot whitelist for social crawlers (Facebook OG preview) — pending Emergent infra confirmation
