# Bytescreen website – project summary

## Stack & setup
- Node.js + Express 5, EJS views, MongoDB (Mongoose), Zod validation, Helmet, express-rate-limit.
- Runs in Docker: containers `bytescreen-backend` (nodemon, port 3000) and `bytescreen-mongodb` (port 27017).
  `.env` has `MONGO_URI=mongodb://mongodb:27017/bytescreen`, so database scripts run inside the backend container:
  `docker exec bytescreen-backend npm run seed:products` (add `-- --reset` to replace the demo products).
- `src/config/env.js` (envalid): `NODE_ENV`, `PORT`, `MONGO_URI` (required), `CONTROLLER_URL`
  (default `https://fusionm.bytescreentech.com`).
- Branch: `test` (main branch: `main`).

## Structure (`src/`)
- `app.js` – EJS setup, Helmet (CSP `img-src` allows bytescreentech.com), static files from `public/` with
  `redirect: false`, shared view locals (`title`, `description`, `path`, `year`, `controllerUrl`, `canonical`,
  `ogImage`, `noIndex`, `jsonLd`), then `res.locals.navMenu` (published products for the nav), routes,
  `notFound`, `errorHandler`.
- `views/` – index, about, customers, partner, contact, demo, product, resources (hub), resource-page, legal, 404.
- `views/partials/` – header (meta/SEO/OG/JSON-LD, favicon = `Bytescreen-Logo-badge.png`), nav, footer, logo,
  lead-form (shared by contact & demo), form-consent, buttons, media, why-choose, support-contacts.
- `public/` – `css/styles.css` (all styles), `js/script.js` (menu + dropdowns), `js/form.js` (AJAX forms),
  `images/`, `resources/<folder>/*.pdf`.
- `data/` – `customers.js` (customer list + logos), `legal.js` (terms/privacy text, `draft` flag),
  `resources.js` (resource pages).
- `services/` – `product.service`, `navigation.service` (cached published products, cleared on product
  create/update/delete), `documents.service` (lists PDFs in a resources folder, builds titles from file names,
  `ACRONYMS` list).

## Pages / routes (`routes/web.routes.js` unless noted)
- `/` home; `/about`; `/customers` (from `data/customers.js`, counts automatic); `/partner` (partner form);
  `/contact` (sales form + support details); `/demo` (lead form, demo only; `?product=` preselects the product);
  `/terms`, `/privacy` (`data/legal.js`, marked DRAFT).
- `/resources` hub + `/resources/:page` (knowledge-base, troubleshooting, brochures, datasheets, whitepapers,
  support-documents) – configured in `data/resources.js`; each lists every PDF in `public/resources/<folder>`.
- `/products/:productKey` (`product.public.routes`) – only `status: "published"`; JSON at `/products/api/:key`.
- Admin API `/api/products` (`product.routes`) – requires an admin/super_admin token.
- Unknown pages → styled 404 page (HTML for browsers, JSON for API paths and JSON requests).

## Forms
- Contact + Demo → `POST /leads` (phone & company required; products from `constants/product.js` `PRODUCT`).
- Partner → `POST /api-partner-inquiry`; interest options = `PRODUCT` list.
- All forms show a consent line linking the Privacy policy and Terms.

## Product model (`models/product/`)
- `basicInfo { productName, productKey, category, shortDescription, navGroup ("products"|"platform"), sortOrder }`
- `status` (draft | published | archived), `seo { title, description, ogImage, noIndex }`, `hero`, `overview`,
  `features`, `benefits` (same shape as features), `models { items[] with image, specs[{label, value}], buttons }`,
  `resources[] { title, description, type: datasheet|brochure|guide|firmware|video|other, url, model }`,
  `faq[]`, `cta` (optional).
- Create validation applies defaults; Update validation (partial) does NOT, so edits don't reset status/resources.
- Product page order: Hero → Overview (text row, then full-width image row, click to enlarge) → Features →
  Benefits → Why choose (shared partial) → Models (2 per row, one spec per row, buttons aligned) → Resources →
  FAQ → CTA.
- Hero always adds "Contact sales" → `/contact#sales` (unless a `/contact` button already exists).
- SEO: title/description fallbacks, canonical URL, OG image, Product + FAQ JSON-LD.
- Example product JSON: `src/seeds/products/bt-wan.json`. Demo seed: `src/seeds/products.seed.js`.

## Dynamic nav / footer / home
- The nav "Products" dropdown, the footer "Products" column and the home page "Explore" buttons all come from
  published products (`navGroup` decides Products vs Platform, `sortOrder` sets the order). Changes made through
  the API show immediately; direct database edits show within 60 seconds.
- Nav: Products ▾, Company, Customers, Partners, Resources ▾ (Knowledge base, Troubleshooting, View all resources),
  Contact, "FusionMaestro login" (`CONTROLLER_URL`), "Schedule a demo" (`/demo`). Collapses to a hamburger menu
  below 1260px.
- Logo: `partials/logo.ejs` = cropped badge (`Bytescreen-Logo-badge.png`) + "BYTESCREEN®" + bracketed tagline.

## Design system
- Colours in `:root` (`--night #10163a`, `--ink #2c3370`, `--signal #7d8dff`, `--ok`, `--paper`, …);
  fonts Archivo + IBM Plex Sans.
- Hero styles: `.page-hero` (pattern background) and `.media-hero` (photo background; set the focal point with
  `style="--media-pos: …; --media-pos-mobile: …"`), used on About, Customers, Partner and Contact.

## Open items / notes
- Partner form spam protection (honeypot `website`, `formLoadedAt`) doesn't work: Zod strips those fields before
  the controller sees them.
- `/leads` has no rate limiter (the partner route uses `leadLimiter`).
- `new: true` (deprecated) is still used in `event.service.js` and `partnerInquiry.service.js`.
- Images are large PNGs (1.8–2.4 MB each); converting to WebP/JPEG would speed pages up a lot.
- Legal pages are demo text (`draft: true`) and need legal review.
- BT-Load Balancer has no product page yet (publishing a product with key `bt-load-balancer` enables its
  nav/footer/Explore links).
- Some content is placeholder (FusionM/demo seed copy, resource links `#` in seed data).
