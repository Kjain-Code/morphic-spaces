# Morphic Spaces — Technical, On-Page & Local SEO Audit

**Site:** https://www.morphicspaces.com · **Repo:** Next.js 16.3.4, App Router, React 19.2, fully static (SSG) · **Date:** 20 Oct 2026

Everything below was checked against the code and a local production build crawled route-by-route (before and after). Nothing has been deployed.

---

## A. Initial audit summary

The site already had a decent SEO base: `metadataBase`, per-page titles, descriptions and canonicals via `lib/seo.ts`, an auto-generated `sitemap.ts` and `robots.ts`, Open Graph/Twitter tags, and JSON-LD for the studio, services, projects and breadcrumbs. Every URL returned the correct status, every image had an `alt` attribute, and no important page was noindexed.

The problems were in how things were wired:

| # | Finding | Where | Severity | Fix | Status | Verified by |
|---|---|---|---|---|---|---|
| 1 | **No structured data in the HTML at all.** All JSON-LD was emitted through `next/script`, which injects it only after hydration. The static HTML crawlers download had 0 JSON-LD blocks on all 35 pages. | `components/seo/json-ld.tsx`, `app/layout.tsx` | High | Render as a plain `<script type="application/ld+json">` (the approach in the Next.js JSON-LD guide), with `<` escaped | Fixed | Crawl: 1 graph site-wide plus Service/CreativeWork + BreadcrumbList on detail pages, all parsed as valid JSON |
| 2 | Root layout set `canonical` and `robots: index` for **every** route, so the 404 page was canonicalised to the homepage and had conflicting `noindex` and `index, follow` tags | `app/layout.tsx` | High | Canonical/robots removed from the root; each page sets its own | Fixed | 404 now has no canonical, only noindex tags |
| 3 | No custom 404. The Next default rendered a 404 titled "Morphic Spaces404: This page could not be found." with no way back into the site | — | Medium | `app/not-found.tsx` (still a real 404 status, noindex, links to main sections) | Fixed | `/does-not-exist`, `/services/nope`, `/projects/nope` → 404 |
| 4 | Homepage `<title>` had no brand ("Architecture & Interior Design Studio in Chandigarh") because a root page doesn't use the layout's title template | `app/page.tsx` | Medium | Absolute title that leads with the brand | Fixed | Crawl |
| 5 | Duplicate brand in titles: "Contact Morphic Spaces \| Morphic Spaces", "About Morphic Spaces Studio \| Morphic Spaces" | about, contact | Low | Rewritten | Fixed | Crawl |
| 6 | All 6 service pages used one city template: "<Service> Services in Chandigarh & Tricity" (same keyword and city on every page) | `app/services/[slug]/page.tsx` | Medium | Separate `seoTitle`/`seoDescription` per service, based on the real sub-services and real project locations | Fixed | Crawl |
| 7 | Service H1s were only editorial lines ("We Design The Framework For Living.") and never named the service | `service-detail-pages.tsx` | Medium | The service-name eyebrow already shown above the headline now sits **inside** the H1, with identical styling | Fixed | H1 = "Architecture & Planning — We Design The Framework For Living."; screenshots pixel-identical |
| 8 | Homepage H1 was only the tagline, and the four scroll "beats" each swapped in their own `<h1>` | `components/home/stage-content.tsx` | Medium | The opening beat is the single H1 (brand + tagline); later beats use `<h2>` | Fixed | H1 = "Morphic Spaces — Beyond Form. Shaping Experience."; screenshots pixel-identical |
| 9 | Services page "From Idea To Reality" cards linked to `/projects#gallery` instead of the actual project pages | `service-project-connection.tsx` | Medium | Link to `/projects/<id>` | Fixed | Code |
| 10 | Project pages never linked to their service (service pages already linked to projects, but not the other way) | `project-detail.tsx` | Medium | Small "→ <Service>" link beside "All Projects". The service comes from the project's own image folder, which the repo already treats as the source of truth | Fixed | Desktop: inline; mobile: wraps cleanly (screenshot) |
| 11 | Project meta descriptions were the full 350–480-character copy | `app/projects/[id]/page.tsx` | Low | First sentence, trimmed at a word boundary | Fixed | Crawl |
| 12 | Project titles like "Residence at Mohali \| Residential Project" had no discipline or place keyword | same | Low | "<Project> — Residential Architecture / Interior Design / Commercial Architecture [in <town>]". Town added only when it's real and not already in the name | Fixed | Crawl |
| 13 | Gallery alt text was "<title> — additional view 1" | `project-detail.tsx` | Low | "<title>, <town> — view 2 of 3" | Fixed | Code |
| 14 | Sitemap `<lastmod>` was set to build time for every URL (claims every page changed on every deploy), plus changefreq/priority, which Google ignores | `app/sitemap.ts` | Low | Removed; the same 35 URLs are generated from the data files | Fixed | Valid XML, 35 `<loc>` |
| 15 | `robots.txt` had a non-standard `Host:` line | `app/robots.ts` | Low | Removed | Fixed | Fetched `/robots.txt` |
| 16 | `/recognition` placeholder was `noindex, nofollow`, and its comment wrongly said robots.txt also blocked it | `app/recognition/page.tsx` | Low | `noindex, follow`; comment corrected. Still not in the sitemap or navigation | Fixed | Crawl |
| 17 | Organization schema: no `logo`, no `WebSite` entity, page schemas repeated the studio's name instead of referencing one `@id` | layout + detail pages | Low | `@graph` with ProfessionalService + WebSite. Service/project schema reference `#organization`; projects reference their service; services list their visible sub-services as an OfferCatalog | Fixed | JSON parse |
| 18 | `lang="en"` | layout | Low | `en-IN`, which matches `og:locale` | Fixed | Crawl |
| 19 | 4 ESLint errors (unescaped `'`) blocked `npm run lint` | `service-detail-pages.tsx` | Low | Changed to `&apos;` (renders identically) | Fixed | `eslint` clean |
| 20 | Homepage is very thin for search: **~35 crawlable words**, no body links except the nav, no footer, no mention of location or services in visible copy | homepage design | **High (content)** | Needs a content decision. See H/I | **Not done (needs approval)** | — |
| 21 | Hero video uses `preload="auto"` on a 14 MB MP4, and a ~2.6 s loading screen sits over the page | `video-scrubber.tsx`, `loading-screen.tsx` | Medium (perf) | Left alone: both are approved, carefully tuned parts of the experience. See G | Not done (needs approval and measurement) | — |
| 22 | `app/icon.png` and `public/icon.png` are **different** images that resolve to the same `/icon.png` URL | `app/`, `public/` | Low | Decide which favicon is correct and delete the other | Not done (brand decision) | — |

No redirect chains, loops, soft-404s, orphan pages, duplicate titles or missing alt attributes were found. Domain-level redirects (http→https, apex→www) are handled by Vercel and are outside the repo. They can't be tested from here (see E).

---

## B. Files changed

**Created**
- `app/not-found.tsx`
- `docs/SEO-AUDIT-2026-10.md` (this report)

**Modified**
- `app/layout.tsx`: JSON-LD `@graph` server-rendered; root canonical, robots and og:url removed; `lang="en-IN"`
- `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/projects/page.tsx`, `app/services/page.tsx`: titles/descriptions
- `app/services/[slug]/page.tsx`: per-service titles/descriptions, Service schema with `@id` refs + OfferCatalog, `dynamicParams = false`
- `app/projects/[id]/page.tsx`: project titles/descriptions, richer CreativeWork schema, related-service lookup, `dynamicParams = false`
- `app/recognition/page.tsx`: `noindex, follow`
- `app/robots.ts`, `app/sitemap.ts`
- `components/seo/json-ld.tsx`: plain server `<script>`, escaped
- `components/home/stage-content.tsx`: single H1
- `components/services/service-detail-pages.tsx`: service name inside the H1; lint fixes
- `components/services/service-project-connection.tsx`: cards link to project pages
- `components/projects/project-detail.tsx`: related-service link, better alt text
- `lib/seo.ts`: `absoluteTitle`, `toMetaDescription`, `breadcrumbJsonLd`, `SERVICE_AREAS`, entity IDs, OG image size for the default share image
- `lib/services-data.ts`: `seoTitle`/`seoDescription` per service, `getServiceForImage()`

**Removed:** nothing. No routes, URLs, images or components were removed or renamed.

## C. Why the important changes matter

- **JSON-LD in HTML (#1):** Google can render JavaScript, but structured data in the initial HTML is the reliable path. It's also what the Rich Results Test, Bing and AI crawlers read. Before this change the site's schema was effectively invisible to anything that doesn't execute JS.
- **Root canonical removed (#2):** a canonical in the root layout cascades into every route that forgets to override it. The 404 page proved that was happening.
- **Distinct service titles (#6):** six pages all targeting "<X> in Chandigarh & Tricity" compete with each other. Each now targets its own intent: architects, interior designers, 3D renders, landscape, consultancy and renovation. Places are named only where real projects exist (Panchkula, Mohali, Banur, Karnal).
- **H1 semantics (#7, #8):** no copy or styling changed. Text that was already visible directly above each headline was moved into the heading element. Before/after screenshots at 1440 px and 390 px are pixel-identical.
- **Internal links (#9, #10):** services → projects → services is now a closed loop, which helps both crawl paths and visitors.

## D. Before → after page table

| URL | Title (before → after) | Meta description (after) | H1 (after) | Canonical | Schema in HTML (before → after) | Indexability |
|---|---|---|---|---|---|---|
| `/` | Architecture & Interior Design Studio in Chandigarh → **Morphic Spaces \| Architecture & Interior Design Studio, Chandigarh Tricity** | Architecture and interior design studio shaping residential, commercial and bespoke spaces across Chandigarh, Panchkula, Mohali, Karnal and Gurugram. | Morphic Spaces — BEYOND FORM. SHAPING EXPERIENCE. | https://www.morphicspaces.com | — → ProfessionalService, WebSite | 200, index, follow |
| `/about` | About Morphic Spaces Studio \| Morphic Spaces → **About the Studio & Founder Kunal \| Morphic Spaces** | Meet Morphic Spaces, the architecture and interior design studio founded by Kunal — our philosophy, our approach and how we shape homes and commercial spaces. | We Are Not Here ToFollow A Language.We Are Here To Create One. | https://www.morphicspaces.com/about | — → ProfessionalService, WebSite | 200, index, follow |
| `/services` | Architecture, Interiors & Spatial Design Services \| Morphic Spaces → **Architecture, Interior Design & 3D Visualization Services \| Morphic Spaces** | Architecture, interior design, 3D visualization, landscape, consultancy and renovation for homes and commercial spaces in Chandigarh, Panchkula, Mohali and Karnal. | Designing With Intent.Shaping Experiences. | https://www.morphicspaces.com/services | — → ProfessionalService, WebSite | 200, index, follow |
| `/services/architecture` | Architecture & Planning Services in Chandigarh & Tricity \| Morphic Spaces → **Residential & Commercial Architects, Chandigarh Tricity \| Morphic Spaces** | Architecture for homes, villas, farmhouses and commercial buildings — site planning to working drawings. Projects in Panchkula, Mohali, Banur and Karnal. | 01 / 06 Architecture & Planning — We Design TheFramework ForLiving. | https://www.morphicspaces.com/services/architecture | — → ProfessionalService, WebSite, Service, BreadcrumbList | 200, index, follow |
| `/services/interior-design` | Interior Architecture & Design Services in Chandigarh & Tricity \| Morphic Spaces → **Interior Designers in Panchkula, Mohali & Chandigarh \| Morphic Spaces** | Interiors for homes, villas, offices and retail — space planning, lighting, materials and custom joinery. Recent interiors in Panchkula, Mohali and Banur. | 02 / 06 Interior Architecture & Design — We ShapeWhat LivesWithin. | https://www.morphicspaces.com/services/interior-design | — → ProfessionalService, WebSite, Service, BreadcrumbList | 200, index, follow |
| `/services/visualization` | 3D Visualization Services in Chandigarh & Tricity \| Morphic Spaces → **3D Architectural Visualization, Renders & Walkthroughs \| Morphic Spaces** | Photorealistic exterior and interior 3D renders, walkthroughs and flythroughs that show materials, light and scale before anything is built. | 03 / 06 3D Visualization — See ItBefore It’sBuilt. | https://www.morphicspaces.com/services/visualization | — → ProfessionalService, WebSite, Service, BreadcrumbList | 200, index, follow |
| `/services/landscape` | Landscape & Outdoor Design Services in Chandigarh & Tricity \| Morphic Spaces → **Landscape, Courtyard & Outdoor Space Design \| Morphic Spaces** | Gardens, courtyards, terraces and outdoor living areas — hardscape, softscape, planting and lighting concepts planned together with the architecture. | 04 / 06 Landscape & Outdoor Design — WhereArchitectureMeets The Land. | https://www.morphicspaces.com/services/landscape | — → ProfessionalService, WebSite, Service, BreadcrumbList | 200, index, follow |
| `/services/design-consultancy` | Design Consultancy Services in Chandigarh & Tricity \| Morphic Spaces → **Architecture & Interior Design Consultancy \| Morphic Spaces** | Focused design advice for ongoing projects — concept reviews, space planning, material and finish consultation and design audits at key stages. | 05 / 06 Design Consultancy — Expertise,WhenYou Need It. | https://www.morphicspaces.com/services/design-consultancy | — → ProfessionalService, WebSite, Service, BreadcrumbList | 200, index, follow |
| `/services/renovation` | Renovation & Transformation Services in Chandigarh & Tricity \| Morphic Spaces → **Home & Commercial Renovation, Chandigarh Tricity \| Morphic Spaces** | Renovating existing homes and commercial spaces — layout replanning, façade upgrades, interior refurbishment and adaptive reuse, including work in Panchkula. | 06 / 06 Renovation & Transformation — ReimaginingWhatAlready Exists. | https://www.morphicspaces.com/services/renovation | — → ProfessionalService, WebSite, Service, BreadcrumbList | 200, index, follow |
| `/projects` | Architecture & Interior Design Projects \| Morphic Spaces → **Architecture & Interior Design Projects in Panchkula, Mohali & Karnal \| Morphic Spaces** | Residences, interiors, commercial buildings and design concepts by Morphic Spaces across Panchkula, Mohali, Banur, Karnal, Kaithal, Yamuna Nagar and Gurugram. | BuiltWithCharacter. | https://www.morphicspaces.com/projects | — → ProfessionalService, WebSite | 200, index, follow |
| `/projects/147p-panchkula` | 147-P, Sector 26 — Panchkula \| Residential Project \| Morphic Spaces → **147-P, Sector 26 — Panchkula \| Residential Architecture \| Morphic Spaces** | A three-storey Panchkula residence composed in charcoal stone and warm timber, its balconies stepping back in a quiet rhythm to soften the street-facing… | 147-P, Sector 26 — Panchkula | https://www.morphicspaces.com/projects/147p-panchkula | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/147p-panchkula-interior` | 147-P Residence, Interior \| Interiors Project \| Morphic Spaces → **147-P Residence, Interior — Interior Design in Panchkula \| Morphic Spaces** | A double-height living room finished in walnut panelling and marble, its faceted timber ceiling drawing the eye up and toward the stair beyond. | 147-P Residence, Interior | https://www.morphicspaces.com/projects/147p-panchkula-interior | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/interior-at-panchkula` | A Panchkula Interior \| Interiors Project \| Morphic Spaces → **A Panchkula Interior — Interior Design \| Morphic Spaces** | A contemporary living space built around a sculpted staircase and dark timber panelling, its patterned rug and stone floor holding the room together. | A Panchkula Interior | https://www.morphicspaces.com/projects/interior-at-panchkula | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residence-at-karnal` | Residence at Karnal \| Residential Project \| Morphic Spaces → **Residence at Karnal — Residential Architecture \| Morphic Spaces** | A classical residence taking shape on a Karnal plot, its cream stone facade and arched loggias designed for a family home of quiet formality. | Residence at Karnal | https://www.morphicspaces.com/projects/residence-at-karnal | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residence-at-yamuna-nagar` | Residence at Yamuna Nagar \| Residential Project \| Morphic Spaces → **Residence at Yamuna Nagar — Residential Architecture \| Morphic Spaces** | A compact three-storey home in Yamuna Nagar, its textured stone base and timber-clad upper volume built for a family that wanted warmth without excess. | Residence at Yamuna Nagar | https://www.morphicspaces.com/projects/residence-at-yamuna-nagar | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residence-at-kaithal` | Residence at Kaithal \| Residential Project \| Morphic Spaces → **Residence at Kaithal — Residential Architecture \| Morphic Spaces** | A modern villa taking shape in Kaithal, organized around clean stone-and-timber volumes, deep overhangs and a planted forecourt. | Residence at Kaithal | https://www.morphicspaces.com/projects/residence-at-kaithal | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residence-at-mohali` | Residence at Mohali \| Residential Project \| Morphic Spaces → **Residence at Mohali — Residential Architecture \| Morphic Spaces** | A Mohali residence composed of stacked glass balconies and warm stone cladding, its planted forecourt framing a sculptural entrance. | Residence at Mohali | https://www.morphicspaces.com/projects/residence-at-mohali | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/96-20-gurugram` | 96/20, Gurugram \| Commercial Project \| Morphic Spaces → **96/20, Gurugram — Commercial Architecture \| Morphic Spaces** | A commercial residential building in Gurugram, its brick and stone facade organized in a formal, symmetrical rhythm around a central entrance. | 96/20, Gurugram | https://www.morphicspaces.com/projects/96-20-gurugram | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/kaushik-clinic-kaithal` | Kaushik Homeo Clinic, Kaithal \| Commercial Project \| Morphic Spaces → **Kaushik Homeo Clinic, Kaithal — Commercial Architecture \| Morphic Spaces** | A small healthcare and retail complex in Kaithal, bringing a clinic, pharmacy and café together around a shared courtyard and fountain. | Kaushik Homeo Clinic, Kaithal | https://www.morphicspaces.com/projects/kaushik-clinic-kaithal | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-classical-concept` | Classical Residence Concept, Karnal \| Residential Project \| Morphic Spaces → **Classical Residence Concept, Karnal — Residential Architecture \| Morphic Spaces** | A design study for a Karnal client, composed around arched colonnades, wrought-iron balconies and a restrained cream stone palette. | Classical Residence Concept, Karnal | https://www.morphicspaces.com/projects/karnal-classical-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-modern-concept` | Modern Residence Concept, Karnal \| Residential Project \| Morphic Spaces → **Modern Residence Concept, Karnal — Residential Architecture \| Morphic Spaces** | A contemporary Karnal residence concept balancing a textured stone volume against a warm timber lattice and a fully glazed entrance bay. | Modern Residence Concept, Karnal | https://www.morphicspaces.com/projects/karnal-modern-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-contemporary-concept` | Contemporary Residence Concept, Karnal \| Residential Project \| Morphic Spaces → **Contemporary Residence Concept, Karnal — Residential Architecture \| Morphic Spaces** | A design study for a Karnal client, its charcoal stone and warm timber volume framed by a full-height glowing light strip at dusk. | Contemporary Residence Concept, Karnal | https://www.morphicspaces.com/projects/karnal-contemporary-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-stone-concept` | Stone Residence Concept, Karnal \| Residential Project \| Morphic Spaces → **Stone Residence Concept, Karnal — Residential Architecture \| Morphic Spaces** | A design study for a larger Karnal residence, its stone facade rising three storeys to a rooftop terrace screened in timber lattice. | Stone Residence Concept, Karnal | https://www.morphicspaces.com/projects/karnal-stone-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-commercial-concept` | Commercial Complex Concept, Karnal \| Commercial Project \| Morphic Spaces → **Commercial Complex Concept, Karnal — Commercial Architecture \| Morphic Spaces** | A design study for a mixed-use Karnal building, ground-floor retail shutters set beneath two storeys of residential balconies above. | Commercial Complex Concept, Karnal | https://www.morphicspaces.com/projects/karnal-commercial-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-corner-concept` | Corner Building Concept, Karnal \| Commercial Project \| Morphic Spaces → **Corner Building Concept, Karnal — Commercial Architecture \| Morphic Spaces** | A second mixed-use design study for a Karnal corner plot, its ground floor of shops wrapping the street corner beneath three storeys of stone-and-marble… | Corner Building Concept, Karnal | https://www.morphicspaces.com/projects/karnal-corner-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/karnal-jali-concept` | Jali Residence Concept, Karnal \| Residential Project \| Morphic Spaces → **Jali Residence Concept, Karnal — Residential Architecture \| Morphic Spaces** | A slim three-storey Karnal residence concept, its white and stone facade framed by a deep, timber-lined roof canopy that shades a planted top-floor terrace. | Jali Residence Concept, Karnal | https://www.morphicspaces.com/projects/karnal-jali-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residence-at-banur` | Residence at Banur \| Residential Project \| Morphic Spaces → **Residence at Banur — Residential Architecture \| Morphic Spaces** | A three-storey Banur residence in warm stone and timber-slat cladding, its rounded corner volume wrapped in a glowing recessed cornice that carries the… | Residence at Banur | https://www.morphicspaces.com/projects/residence-at-banur | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residence-at-banur-interior` | Residence at Banur, Interior \| Interiors Project \| Morphic Spaces → **Residence at Banur, Interior — Interior Design \| Morphic Spaces** | A double-height foyer built around a marble-clad staircase, its glass balustrade and warm timber handrail lit by a suspended crystal chandelier above. | Residence at Banur, Interior | https://www.morphicspaces.com/projects/residence-at-banur-interior | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/arora-residence-panchkula` | Arora Residence, Panchkula \| Residential Project \| Morphic Spaces → **Arora Residence, Panchkula — Residential Architecture \| Morphic Spaces** | A Panchkula residence composed around a full-height glazed stair bay, its perforated brass jali screen catching light beside a projecting timber-lined canopy. | Arora Residence, Panchkula | https://www.morphicspaces.com/projects/arora-residence-panchkula | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/panchkula-duplex-interior` | A Panchkula Duplex, Interior \| Interiors Project \| Morphic Spaces → **A Panchkula Duplex, Interior — Interior Design \| Morphic Spaces** | A double-height Panchkula living space finished in walnut panelling and warm marble, its floating TV console and sculpted pendant lighting anchoring an open… | A Panchkula Duplex, Interior | https://www.morphicspaces.com/projects/panchkula-duplex-interior | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/residential-apartments-concept` | Residential Apartments Concept \| Residential Project \| Morphic Spaces → **Residential Apartments Concept — Residential Architecture \| Morphic Spaces** | A design study for a low-rise apartment block, four floors of glass-railed balconies stacked above a ground level of open parking. | Residential Apartments Concept | https://www.morphicspaces.com/projects/residential-apartments-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/commercial-building-concept` | Commercial Building Concept \| Commercial Project \| Morphic Spaces → **Commercial Building Concept — Commercial Architecture \| Morphic Spaces** | A four-storey commercial building rendered in a clean cream stone facade with tall glazed bays that wrap the upper floors. | Commercial Building Concept | https://www.morphicspaces.com/projects/commercial-building-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/group-housing-concept` | Group Housing Concept \| Residential Project \| Morphic Spaces → **Group Housing Concept — Residential Architecture \| Morphic Spaces** | A group housing design study of tall residential towers in a cream palette, with timber-toned balcony bands giving each block its own rhythm. | Group Housing Concept | https://www.morphicspaces.com/projects/group-housing-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/projects/pg-building-concept` | PG Building Concept \| Residential Project \| Morphic Spaces → **PG Building Concept — Residential Architecture \| Morphic Spaces** | A design study for a paying-guest residence, four floors of deep balconies raised on stilts above an open parking level. | PG Building Concept | https://www.morphicspaces.com/projects/pg-building-concept | — → ProfessionalService, WebSite, CreativeWork, BreadcrumbList | 200, index, follow |
| `/contact` | Contact Morphic Spaces \| Morphic Spaces → **Contact Us — Architecture & Interior Design Enquiries \| Morphic Spaces** | Talk to Morphic Spaces about your architecture or interior project — call +91 90535 11417, WhatsApp us or send an enquiry. Studio at Dhakoli, Punjab. | Let’s Start A Conversation. | https://www.morphicspaces.com/contact | — → ProfessionalService, WebSite | 200, index, follow |
| `/recognition` | Recognition & Features \| Morphic Spaces → **Recognition & Features \| Morphic Spaces** | Recognition and features for Morphic Spaces, an architecture and interior design studio based in Chandigarh. | Recognition | https://www.morphicspaces.com/recognition | — → ProfessionalService, WebSite | 200, noindex, follow |

*(Homepage and 404 canonical without trailing slash is equivalent to `/`. The sitemap now lists the homepage in the same form.)*

## E. Technical SEO checklist

| Check | Result |
|---|---|
| All 35 indexable URLs return 200 | ✅ Passed |
| Unknown service/project/random URLs return real 404 | ✅ Passed (now with branded page) |
| One unique title + description per indexable page | ✅ Fixed |
| Self-referencing absolute canonical on every indexable page | ✅ Passed |
| No accidental noindex | ✅ Passed (only `/recognition` placeholder and 404 are noindex, intentionally) |
| robots.txt valid, points to sitemap, blocks nothing needed for rendering | ✅ Fixed |
| sitemap.xml valid XML, only canonical 200 URLs, auto-generated from data | ✅ Fixed |
| JSON-LD present in server HTML and valid JSON | ✅ Fixed |
| Breadcrumb schema on service and project pages | ✅ Passed (now server-rendered) |
| Every `<img>` has an alt attribute | ✅ Passed (decorative ones intentionally empty) |
| Main nav uses real `<a href>` links | ✅ Passed |
| Single H1 per page | ✅ Fixed (homepage) |
| Open Graph / Twitter cards with absolute URLs | ✅ Passed |
| HTTP→HTTPS and apex→www redirects | ⚠️ Needs external verification (Vercel domain settings, not in repo) |
| Rich Results Test / Schema validator on the live site | ⚠️ Needs external verification after deploy |
| Search Console coverage, sitemap submission, URL inspection | ⚠️ Needs account access |
| Core Web Vitals (field data) | ⚠️ Not measured (see F) |
| Homepage crawlable content | ❌ Not completed (needs content approval) |
| Hero video / loader performance tuning | ❌ Not completed (needs approval + real-device measurement) |
| Favicon conflict | ❌ Not completed (brand decision) |
| Analytics / Search Console verification tag | ℹ️ None found in code. If GSC is verified, it's via DNS or Vercel. Nothing was removed. |

## F. Build, lint, type-check and test results

- **ESLint:** 4 errors before (pre-existing) → **0** after.
- **TypeScript:** clean as part of `next build` (route types are generated during the build).
- **Production build:** ✅ succeeded, 42 static pages, 0 warnings. *Caveat:* the build sandbox can't reach Google Fonts, so the build was run with `next build --webpack` and stubbed font responses. **Run `npm run build` (Turbopack) on your machine before deploying** to confirm the default pipeline.
- **Crawl test:** all routes were fetched from `next start` and checked for status, title, description, canonical, robots, H1, JSON-LD and alt attributes, before and after (table in D).
- **Visual regression:** Playwright screenshots of `/`, `/services/architecture`, `/services/visualization` and a project page at 1440 px and 390 px, before vs after. Home and service pages are **pixel-identical**. The project page differs only by the new service link.
- **Not run:** Lighthouse/PageSpeed (local numbers would be meaningless with stubbed fonts and a sandboxed network), Rich Results Test, Search Console. No performance score is claimed.

## G. Remaining issues and limitations

1. **Thin homepage (biggest SEO gap).** The approved homepage is a single pinned video journey with ~35 words. Google sees the brand, a tagline and nav links. It can't tell from the page that this is an architecture studio serving the Tricity.
2. **Hero performance:** `preload="auto"` on a 14 MB video, plus the loading overlay, will likely hurt LCP on mobile data. Options to test: `preload="metadata"` on small screens, a mobile-specific lower-bitrate encode, or a shorter loader on repeat visits. This needs testing against the scrub behaviour that `video-scrubber.tsx` documents.
3. **Source images:** several JPEGs are 1.4–2.7 MB (Banur, Arora). They are served through `next/image`, so visitors get resized WebP/AVIF, but re-exporting the originals at ~2000 px / 80% quality would shrink the repo and speed up Vercel's first optimisation.
4. **NAP:** the site publishes "Shop No. 18, Dhakoli, Punjab" with no town or PIN code. Schema mirrors this exactly; nothing was invented.
5. **Service-page H1 includes "01 / 06".** It's hidden from screen readers but still in the text. That's harmless, and it can be dropped from the H1 if the client prefers.

## H. Next steps (prioritised)

1. **Deploy**, then in Search Console: submit `https://www.morphicspaces.com/sitemap.xml`, run URL Inspection on `/`, one service page and one project page, and check "Page indexing" for excluded URLs.
2. Run the **Rich Results Test** on `/services/architecture` and `/projects/residence-at-mohali` to confirm Breadcrumb detection.
3. Check in Vercel that `morphicspaces.com` → `https://www.morphicspaces.com` is a single 308/301 and that preview deployments aren't indexable (Vercel adds `X-Robots-Tag: noindex` to preview URLs by default).
4. **Google Business Profile:** if one exists, make the name, address (full locality + PIN), phone (+91 90535 11417) and website match the site exactly, then add the full address to the footer, contact page and schema. If the studio isn't a walk-in office, set it up as a service-area business.
5. **Homepage content (needs client approval):** add a short section after the video journey, or reinstate the existing footer, with a 2–3 sentence studio description naming the services and the Tricity, links to the six services, 3 featured projects and contact details. The repo already has unused components for this (`components/home/intro-section.tsx`, `services-preview.tsx`, `featured-projects.tsx`, `contact-cta.tsx`).
6. Measure real Core Web Vitals (PageSpeed Insights / CrUX once there's traffic), then decide on the video changes in G2.
7. Start collecting genuine Google reviews from completed clients. Never add review markup the site doesn't actually show.

## I. Location pages: recommendation (not created)

| Location | Evidence on the site | Recommendation |
|---|---|---|
| **Panchkula** | 4 projects (147-P Sec 26 exterior + interior, Arora Residence, Panchkula duplex, Panchkula interior) | **Strongest case.** A page like "Architects & Interior Designers in Panchkula", built from these real projects (what was built, materials, sectors), is unique and useful. |
| **Karnal** | 8 projects (1 residence + 7 design concepts) | **Good case**, as long as it's honest that most are concepts/design studies. |
| Mohali | 1 residence | Not yet. Optimise the existing project page; revisit at 3+ projects. |
| Zirakpur / Dhakoli | Studio address | Possibly a "Studio" or contact-page section, not a doorway page. |
| Kharar, New Chandigarh | No projects | Don't create. |
| Delhi, Noida, Greater Noida | No projects, not listed as service areas | **Don't create.** That would be a doorway page with nothing behind it. |
| Gurugram | 1 commercial project, listed as a service area | Not yet. Keep it in service-area copy. |

Each page would need new, approved copy and should go live only after client sign-off.

## J. Implemented vs only recommended

**Implemented and verified in code + local build:** items 1–19 in section A (server-rendered JSON-LD; canonical/robots fix; custom 404; all title, description and H1 changes; internal links; alt text; sitemap/robots clean-up; schema graph; `lang`; lint fixes).

**Only recommended (not changed):** homepage content, hero video/loader performance, image re-export, favicon conflict, NAP completion, Google Business Profile alignment, location pages, Search Console actions and any deployment.
