# Spec: Eye Soul homepage

Status: ready-for-agent

Domain language: `GLOSSARY.md`. Decisions: `docs/adr/0001` (separate React SPA + NestJS API), `0002` (auth owned by the API), `0003` (no product variants). Visual style comes from Variant B of the Product Detail prototype on branch `prototype/pdp-style`.

## Problem Statement

Eye Soul wants to sell Digital Cameras, Film Cameras and Film Rolls online to shoppers in Vietnam, but nothing exists yet: no codebase, no catalog data, no storefront. A shopper arriving at the site has nowhere to land, cannot see what the shop sells, cannot get a feel for how a film looks, and cannot start building a Cart. The owner also needs the technical foundation (monorepo, database, API, web app) that every later feature (Auth, listings, product detail, checkout, admin) will build on.

## Solution

A Vietnamese-language homepage, served by the React web app and fed by the NestJS API from a seeded Postgres database. It has:

- A header with the Eye Soul logo, navigation to the three Product Types, a search box with instant suggestions, a Cart button with a count and a slide-out mini-cart, and an account button that shows signed-in or signed-out state (driven by stub data for now).
- One animated hero banner, hard-coded in the web app, with a slow Ken Burns zoom on a large image, a fading-in tagline, and three buttons that lead to the three Product Types.
- Three rows of Featured Products, one per Product Type (Digital Camera, Film Camera, Film Roll), four products each, with a "Xem tất cả" link per row.
- A masonry grid of 12 Sample Photos shot on Film Rolls, each labelled with its Film Roll and linking to that Film Roll.
- A basic footer.

A shopper can add products to a Cart without signing in. The Cart lives in the browser and survives reloads.

Delivering this also sets up the whole stack end to end: monorepo, Docker Postgres, Prisma schema and seed, NestJS endpoints and the React app.

## User Stories

### Landing and brand

1. As a shopper, I want the homepage to open with a large, slowly zooming photo and a tagline that fades in, so that I immediately feel the shop's warm, nostalgic, film-magazine character.
2. As a shopper, I want three clear buttons in the hero (Máy ảnh digital, Máy ảnh film, Cuộn film), so that I can jump straight to the kind of product I came for.
3. As a shopper who prefers reduced motion, I want the hero animation to be disabled or minimal, so that the page does not make me uncomfortable.
4. As a shopper, I want the whole page in Vietnamese with prices in VND formatted like `12.500.000 ₫`, so that I can read it and judge prices naturally.
5. As a shopper, I want a consistent look (cream paper background, charcoal text, amber accent, serif headings, subtle film grain), so that the shop feels premium and coherent.

### Header and navigation

6. As a shopper, I want the Eye Soul logo in the header to take me back to the homepage, so that I always have a way home.
7. As a shopper, I want header links to Digital Camera, Film Camera and Film Roll, so that I can browse by Product Type from anywhere.
8. As a shopper on a phone, I want the header to collapse into a compact menu, so that it fits a small screen.
9. As a shopper, I want the header to stay reachable while I scroll, so that search and Cart are always at hand.

### Search

10. As a shopper, I want suggestions to drop down once I have typed at least 2 characters, so that I can find a product without finishing my query.
11. As a shopper, I want suggestions to cover all three Product Types, each showing a Product Photo, name, Product Type and price, so that I can recognise the right item.
12. As a shopper, I want Sold Film Cameras excluded from suggestions, so that I am not tempted by something I cannot buy.
13. As a shopper, I want to click a suggestion to go to that product, so that search leads somewhere useful.
14. As a shopper, I want pressing Enter to take me to the search results page for my query, so that I can see everything that matched.
15. As a shopper, I want to move through suggestions with the arrow keys and close them with Escape, so that search works from the keyboard.
16. As a shopper, I want a clear "no results" message when nothing matches, so that I know to try different words.
17. As a shopper typing quickly, I want suggestions to keep up without flickering or showing stale results for an older query, so that what I see matches what I typed.

### Featured Products

18. As a shopper, I want one row of Featured Products for each Product Type, in the order Digital Camera, Film Camera, Film Roll, so that I see a bit of everything the shop sells.
19. As a shopper, I want each row to show up to 4 products, so that the page stays scannable.
20. As a shopper, I want each row to have a "Xem tất cả" link to that Product Type's listing, so that I can see more.
21. As the shop owner, I want products I mark as featured to appear in their Product Type's row in the order I set, so that I control what gets promoted.
22. As the shop owner, I want a row with no featured products to fall back to the newest products of that Product Type, so that the homepage is never empty.
23. As the shop owner, I want a row with fewer than 4 featured products to fill the remaining slots with the newest non-featured products of that type, so that every row stays full when stock allows.
24. As a shopper, I want Sold Film Cameras never to appear on the homepage, even if they were featured, so that everything shown is buyable.
25. As a shopper, I want Out of Stock Digital Cameras and Film Rolls to still appear, labelled "Hết hàng", so that I know the shop carries them.
26. As a shopper, I want a Product Type with no products at all to hide its row instead of showing an empty shell, so that the page looks finished.
27. As a shopper on a phone, I want each row to become a horizontally scrollable strip, so that I can swipe through products.

### Product card

28. As a shopper, I want each card to show the first Product Photo, the name and the price in VND, so that I can compare at a glance.
29. As a shopper, I want Film Camera cards to show a Condition Grade badge (A+, A, B, C), so that I know the state of a used unit before clicking.
30. As a shopper, I want to click a card to go to that product's page, so that I can learn more.
31. As a shopper, I want an "Thêm vào giỏ" button on cards that can be bought, so that I can add things without leaving the homepage.
32. As a shopper, I want Out of Stock cards to hide the add-to-cart button and show "Hết hàng", so that I don't try to buy what isn't there.
33. As a shopper, I want a brief confirmation when I add something to my Cart, so that I know it worked.

### Cart (signed-out)

34. As a signed-out shopper, I want to add products to a Cart, so that I don't have to create an account just to start shopping.
35. As a shopper, I want the Cart button to show how many items are in my Cart, so that I can track it.
36. As a shopper, I want my Cart to survive a page reload or closing the tab, so that I don't lose what I picked.
37. As a shopper, I want to open a mini-cart drawer from the header listing each line with photo, name, unit price, quantity and line total, plus the Cart subtotal, so that I can review my Cart without leaving the page.
38. As a shopper, I want to change quantities and remove lines in the mini-cart, so that I can adjust my Cart.
39. As a shopper, I want a Film Camera's quantity fixed at 1 (adding it again does nothing more, and there is no quantity stepper), so that I don't try to buy a unique unit twice.
40. As a shopper, I want adding a Digital Camera or Film Roll I already have to increase its quantity, so that I don't get duplicate lines.
41. As a shopper, I want an empty-Cart message in the mini-cart with a nudge back to shopping, so that an empty drawer is not a dead end.
42. As a shopper, I want a "Thanh toán" button in the mini-cart, so that I know where checkout will begin (it leads to a placeholder for now).
43. As the shop owner, I want holding a Film Camera in a Cart not to reserve it, so that whoever pays first gets it.

### Account (stub)

44. As a signed-out shopper, I want an "Đăng nhập" button in the header that leads to the login page, so that I know where to sign in.
45. As a signed-in shopper, I want the header to show my name or avatar with a menu containing "Đăng xuất", so that I can see I'm signed in and sign out.
46. As a developer, I want the signed-in and signed-out header states driven by stub session data, so that the header is finished before real Auth exists.

### Sample Photos

47. As a shopper, I want a section near the bottom with 12 Sample Photos shot on Film Rolls in a masonry grid, so that I can see how each film renders colour and grain.
48. As a shopper, I want the grid to show as many different Film Rolls as possible (one photo per Film Roll first, then more photos of the same Film Rolls if there aren't enough), so that I see the variety of films the shop sells.
49. As a shopper, I want each Sample Photo labelled with its Film Roll's name (on hover on desktop, always visible on mobile), so that I know which film made it.
50. As a shopper, I want to click a Sample Photo to go to that Film Roll's page, so that I can buy the film that made a photo I like.
51. As a shopper, I want Sample Photos of cameras kept off the homepage, so that this section stays about Film Rolls.

### Footer

52. As a shopper, I want a footer with contact info, links to shipping and return policies, and social links, so that I can find practical information and trust the shop.

### Resilience and performance

53. As a shopper, I want the page layout to appear right away with placeholders while data loads, so that the page doesn't jump around.
54. As a shopper, I want a friendly error with a retry option if the shop's data can't load, so that I'm not left with a blank page.
55. As a shopper, I want photos to load lazily below the fold, so that the page opens quickly on mobile data.
56. As a shopper using a screen reader, I want photos to have meaningful alt text and controls to be labelled, so that I can use the shop.

### Foundation (developer)

57. As a developer, I want one npm workspaces monorepo containing the web app, the API and a shared types package, so that the web app and API agree on data shapes.
58. As a developer, I want a local Postgres started with one Docker Compose command, so that I can develop without depending on Supabase or the network.
59. As a developer, I want one command to migrate and seed the database with realistic Vietnamese catalog data, so that the homepage has something real-looking to show.
60. As a developer, I want the API packaged with a Dockerfile, so that it can be deployed to a container host later.
61. As a developer, I want the web app's API base URL and the API's database URL and allowed web origin set through environment variables, so that the same code runs locally and in production.

## Implementation Decisions

### Repository and stack
- npm workspaces monorepo with three packages: the web app (React + Vite + TypeScript, React Router, TanStack Query, Tailwind, shadcn/ui, Motion), the API (NestJS + TypeScript + Prisma), and a shared package holding the DTO types both sides use.
- Docker Compose provides Postgres for development and for the API's tests. Production will use Supabase Postgres; Supabase Storage holds images later. Seed images are static placeholder URLs, so no upload pipeline is built now.
- The API has a Dockerfile. The web app builds to static files. The API enables CORS for the configured web origin.

### Data model (Prisma)
- **Product**: id, slug (unique), Product Type (enum: Digital Camera, Film Camera, Film Roll), name, price as an integer number of VND, short description, created-at timestamp.
  - Stock count for Digital Cameras and Film Rolls. Zero means Out of Stock.
  - Sold flag or sold-at timestamp, used only for Film Cameras.
  - Condition Grade (enum A+, A, B, C) and a free-text condition note, required for Film Cameras and empty otherwise.
  - Featured flag plus a featured rank, so the admin can set the order later.
- **Product Photo**: belongs to one Product, has a URL, alt text and a position. The first by position is the card image.
- **Sample Photo**: belongs to exactly one Product, has a URL, alt text and a created-at timestamp. The homepage uses only Sample Photos whose Product is a Film Roll.
- No variant tables (ADR-0003). No user, Cart or order tables yet: the Cart lives in the browser, and Auth is a later feature.
- The seed contains enough products of each type to exercise every rule:
  - at least 6 per Product Type
  - some featured with explicit ranks
  - one Product Type left with no featured products, to show the fallback
  - at least one Sold Film Camera that is featured
  - at least one Out of Stock Digital Camera and one Out of Stock Film Roll
  - fewer than 12 Film Rolls with Sample Photos, so the repeat rule kicks in
  - realistic Vietnamese names and descriptions

### API contract
- **Homepage data**, one aggregated read endpoint. It returns:
  - `rows`: an ordered list of `{ productType, products: ProductCard[] }`. Order is Digital Camera, Film Camera, Film Roll. A Product Type with no eligible products is omitted.
  - `samplePhotos`: a list of up to 12 `{ id, url, alt, filmRoll: { slug, name } }`.
- **ProductCard** (shared type): `{ id, slug, productType, name, priceVnd, photo: { url, alt } | null, conditionGrade | null, availability }`, where `availability` is `available` or `out_of_stock`. Sold Film Cameras never appear, so there is no `sold` value on the homepage.
- **Row selection rule**, per Product Type:
  - exclude Sold Film Cameras
  - take featured products ordered by featured rank
  - fill up to 4 with the newest non-featured products of that type
- **Sample Photo selection rule**:
  - among Sample Photos of Film Rolls, first take the newest photo of each distinct Film Roll, ordered newest-first
  - if fewer than 12, add the next-newest remaining photos regardless of Film Roll, up to 12
- **Search suggestions** endpoint takes a query string. Queries shorter than 2 characters (after trimming) return an empty list without hitting the database. Otherwise it returns up to 8 ProductCards whose name matches the query, case-insensitively, across all three Product Types, excluding Sold Film Cameras.

### Web app
- **Routes**:
  - the homepage
  - placeholder pages for a Product Type listing, product detail (by slug), search results (with the query), login, and checkout
  - a footer policy page placeholder
- Data fetching goes through TanStack Query hooks over a single typed API client that uses the shared types.
- **Guest Cart**: a client-side Cart store persisted to localStorage.
  - Each line holds the product id, a snapshot of the card data (name, price, photo, Product Type) and a quantity.
  - Rules: a Film Camera's quantity is capped at 1, Out of Stock products can't be added, and adding an existing Digital Camera or Film Roll increments its quantity.
  - The store is the only thing the header badge and the mini-cart read from.
  - Merging into an account Cart is left for the Auth feature.
- **Stub session**: a session source that reports signed-in (with a display name) or signed-out. It defaults to signed-out and can be switched in development. The header reads only from it, so real Auth can replace it later.
- **Hero**: hard-coded content (image, tagline, three Product Type CTAs) with a Ken Burns zoom and fade-in tagline built with Motion. It respects `prefers-reduced-motion`.
- **Style tokens**, from prototype Variant B, defined once as Tailwind theme tokens:
  - colours: paper `#F5F1EA`, ink `#1C1C1C`, amber `#E8A33D`, line `#E2DACB`, card `#FBF8F3`
  - fonts: Playfair Display for headings, Inter for body
  - 16px radius, soft warm shadow, page-wide subtle film-grain overlay
- **Magazine look** (Variant B): very large serif section titles with the second word in italics, a small amber kicker line above each title, sections separated by a black top rule. Photos lead; Sample Photos sit in a grid of mixed sizes with captions. Product cards stay quiet: card colour, soft shadow.
- **Condition Grade badge**: a circled serif letter (A+, A, B, C), the same component the future Product Detail page will use.
- **Responsive**: rows become horizontal scroll strips on mobile; Sample Photo labels are always visible on touch screens.
- Price formatting is one shared VND formatter (`12.500.000 ₫`).

## Testing Decisions

- Good tests exercise external behaviour through the agreed seams only: HTTP in and JSON out for the API, and what a user sees and does for the web app. They don't assert on internal services, repositories, component internals or call counts, so refactoring inside a seam never breaks a test.
- **Seam 1: API over HTTP against a real Postgres.** Tests boot the NestJS app, run against a Docker Postgres test database seeded per test with the minimal fixtures each case needs, and call the endpoints over HTTP (supertest). Covers:
  - each row contains only its own Product Type, at most 4 products, rows in the fixed order, and empty Product Types omitted
  - featured products come first, in rank order
  - fallback to newest when a row has no featured products, and top-up when it has fewer than 4
  - Sold Film Cameras excluded even when featured
  - Out of Stock products included with `out_of_stock` availability
  - Condition Grade present only for Film Cameras
  - Sample Photos: Film Roll photos only, one per Film Roll first, then top-up, capped at 12
  - search: under 2 characters returns empty; matches are case-insensitive across all types; Sold Film Cameras excluded; capped at 8
- **Seam 2: the rendered homepage with the network mocked (Vitest + Testing Library + MSW)**, driven through user-visible text, roles and labels. Covers:
  - three rows render with VND prices, Condition Grade badges and "Hết hàng" labels
  - add-to-cart updates the header count; the mini-cart shows lines and the subtotal; the Cart survives a remount, simulating a reload
  - a Film Camera can't go past quantity 1; Out of Stock cards have no add button
  - search shows the dropdown from 2 characters and Enter navigates to the results route
  - header renders both stub session states
  - clicking a Sample Photo navigates to its Film Roll
  - loading and error states render
- No unit tests below these seams. No browser end-to-end suite (Playwright) in this feature.
- Prior art: none, this is the first feature in an empty repo. These tests become the template for later features.

## Out of Scope

- Real Auth (registration, email + password, Google, JWT) and merging the guest Cart into an account Cart: these belong to the next feature (ADR-0002).
- Admin UI: marking Featured Products and setting rank, managing products and photos, uploading to Supabase Storage. The data model supports these, but there is no UI.
- Real pages behind the placeholder routes: Product Type listings, product detail, search results, login, checkout, policy pages.
- Checkout, payment, orders and stock decrement.
- Admin-managed or multi-slide banners. The hero is a single hard-coded banner.
- Lenses, accessories, film developing and scanning, Film Roll expiry and expired film, customer-submitted Sample Photos, ratings and reviews, sale and discount prices, English UI.
- Production deployment itself. The Dockerfile and environment configuration are prepared, but nothing is deployed.

## Further Notes

- The Product Detail prototype (`prototype/pdp-style`, Variant B: "Tạp chí: ảnh kể chuyện") is a style source only. Its layout is for the future Product Detail feature. Don't merge that branch.
- The prototype's Sample Photo captions read "place · Film Roll". The model has no place field, so homepage captions show only the Film Roll name. Adding a place is a small later change.
- The prototype caption "Shot on this camera · Kodak Portra 400" hints that a Film Camera's Sample Photo could also name the Film Roll it was shot on. That's undecided and not part of this spec.
- Suggested first ticket: the tracer bullet. It stands up the monorepo, Docker Postgres, the Prisma schema with a seed, the homepage endpoint returning rows, and a homepage rendering one row end to end with both test seams wired. Every later ticket adds to it.
