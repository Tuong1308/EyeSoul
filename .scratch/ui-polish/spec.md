# Spec: Eye Soul UI polish (English storefront, new homepage)

Status: ready-for-agent

Domain language: `GLOSSARY.md` (notably Product Type, Product Photo, Sample Photo, Featured Product, Spotlight). Decisions: `docs/adr/0004` (English-only UI and routes for a shop still selling in Vietnam, prices in VND), plus `0001`–`0003`. The visual answers come from the prototype on branch `prototype/ui-polish` (commit message lists every verdict); it is a primary source to look at, not code to merge. The original logo artwork is `docs/reference/eye-soul-logo-original.jpeg`.

## Problem Statement

The Eye Soul homepage works, but it doesn't feel like the shop it is meant to be. Everything sits in a narrow column with empty space on both sides. The hero is a dark stock photo that says little. The site name is plain text where a logo should be. Product cards look generic, and they show random pictures instead of the camera or film being sold. The Sample Photo grid looks messy. Nothing moves when you scroll or hover, so the page feels static. The homepage also has nowhere to tell shoppers what else Eye Soul will offer: sharing their own photos and getting help from an AI assistant. On top of that, the owner has decided the storefront should be in English.

## Solution

A full-width, English storefront with a new homepage and a consistent motion language, built on the existing Variant B look (cream paper, charcoal ink, amber accent, Playfair Display serif headings, Inter body, film grain):

- An SVG Eye Soul logo (the eight-petal star with an eye, plus the serif "EYE SOUL" wordmark) in the header, the footer and the hero.
- A header with one **Products** entry whose drop-down offers the three Product Types with a photo each. The header stays pinned and tightens up once you scroll past the hero.
- A light hero whose parts appear one after another: logo, a serif headline with a photo pill set inside it, a short line, two buttons, then a full-bleed film strip of photos and a ticker of the shop's commitments, both scrolling endlessly.
- Three **Spotlights** in alternating full-bleed bands: the shop's products (with photographer quotes), photo sharing and portfolios, and the AI assistant. Each band reveals slowly, line by line, as you scroll to it.
- The Sample Photos as polaroids in one horizontal row, on a dark full-bleed band.
- A dark full-bleed footer with the stacked logo.
- The three Featured Product rows move off the homepage to a temporary **/products** page with Product Type tabs, until the real Products page is built.
- Minimal product cards that show the product itself (its first Product Photo) with a round quick-add button.
- Real-looking seed data: real Product Photos of each seeded camera and film roll, and English names and text.

## User Stories

### Language, prices and routes

1. As a shopper, I want the whole storefront in English, so that I can read every label, button and message.
2. As a shopper in Vietnam, I want prices still in VND, shown English-style as `₫12,500,000`, so that I know exactly what I'll pay.
3. As a shopper, I want readable English URLs (`/products`, `/products/<product>`, `/checkout`, `/login`, `/search`, `/shipping-policy`, `/returns-policy`), so that links make sense when I share or bookmark them.
4. As a shopper using a screen reader, I want the page language declared as English, so that my reader pronounces the text correctly.
5. As a shopper, I want product names and photo descriptions in English, so that the catalog reads the same as the rest of the site.

### Layout

6. As a shopper on a wide screen, I want backgrounds to run edge to edge, so that the site no longer looks squeezed into a column.
7. As a shopper on a very wide screen, I want text and product grids kept to a comfortable width with fluid side margins, so that lines and cards don't stretch absurdly.
8. As a shopper, I want the page to alternate light and dark bands, so that each section feels distinct.
9. As a shopper on a phone, I want every new section to work at phone width without sideways page scrolling, so that the site is just as usable on mobile.

### Logo and header

10. As a shopper, I want to see the Eye Soul logo (the star-and-eye mark with the wordmark) in the header, so that the shop has a recognisable identity.
11. As a shopper, I want the header logo to take me home, so that I always have a way back.
12. As a shopper, I want the logo to stay sharp at any size and on light or dark backgrounds, so that it never looks blurry or boxed.
13. As a shopper, I want a single "Products" entry in the header, so that navigation is simple.
14. As a shopper on desktop, I want hovering or keyboard-focusing "Products" to open a drop-down with Digital cameras, Film cameras and Film rolls, each with a photo, so that I can jump straight to the kind of product I want.
15. As a shopper, I want clicking "Products" itself to open the Products page, so that I can browse everything.
16. As a shopper on a phone, I want the menu to list Products with the three Product Types indented under it, so that I can reach them without hover.
17. As a shopper, I want the header to stay pinned while I scroll, so that search and Cart are always at hand.
18. As a shopper, I want the header to get slightly shorter, with a soft shadow and blurred background, once I've scrolled past the hero, so that it takes less room while I browse.

### Hero

19. As a shopper, I want the hero to appear piece by piece when the page loads (logo, headline word by word, the photo pill opening out, the short line and buttons, then the film strip), so that the shop feels crafted. The whole sequence takes about 1.8 seconds.
20. As a shopper, I want the logo's star to make one slow turn once the hero has loaded, so that the brand mark feels alive.
21. As a shopper, I want a big serif headline, "Slow down, [photo] look closer.", with a rounded photo set inside the line, so that the shop's character comes through immediately.
22. As a shopper, I want the photo in the headline to crossfade between a few photos every few seconds, so that the hero feels lively without a video.
23. As a shopper, I want a short line under the headline ("New digital cameras, hand-graded used film cameras, and the film rolls for your next frame."), so that I know what the shop sells.
24. As a shopper, I want a "Shop film cameras" button that takes me to the Products page filtered to Film Cameras, so that I can go straight to the shop's signature products.
25. As a shopper, I want a "See sample photos" button that smoothly scrolls me down to the Sample Photos, so that I can see what film looks like.
26. As a shopper, I want a full-width film strip of photos (with sprocket holes and frame numbers) scrolling slowly and endlessly, so that the hero feels like film running through a camera.
27. As a shopper, I want the film strip to pause while my pointer is over it, so that I can look at a photo.
28. As a shopper, I want an amber ticker under the strip, running the other way, that repeats the shop's commitments ("Film cameras graded A+ to C", "Nationwide delivery", "Inspected before shipping"), so that I know why I can trust the shop.
29. As a shopper, I want the hero to appear right away even while the rest of the page is loading, so that I'm never staring at a blank top.

### Spotlights

30. As a shopper, I want the homepage to tell me about Eye Soul's main capabilities in three Spotlights, so that I understand what the site offers beyond a list of products.
31. As a shopper, I want the Products Spotlight to show a film camera and a film roll with a photographer's quote that changes every few seconds, so that the shop feels rooted in photography.
32. As a shopper, I want a "Browse products" button in the Products Spotlight, so that I can start shopping.
33. As a shopper, I want the Sharing Spotlight to show what a portfolio of my own film photos could look like, so that I'm drawn to share my work on Eye Soul.
34. As a shopper, I want a "Start your portfolio" button in the Sharing Spotlight, so that I can find that capability.
35. As a shopper, I want the AI assistant Spotlight to show a short conversation about choosing film and metering, so that I see how the assistant could help me.
36. As a shopper, I want an "Ask the assistant" button in the AI Spotlight, so that I can find that capability.
37. As a shopper, I want each Spotlight's lines to rise in slowly one after another, and its picture to grow gently into place when I scroll to it, so that the page unfolds calmly as I read.
38. As a shopper, I want the Spotlights to alternate sides and background colours (paper, warm beige, espresso), so that they read as separate stories and the last one doesn't merge with the dark Sample Photo band below.

### Sample Photos

39. As a shopper, I want the Sample Photos shown as polaroids with the Film Roll's name written in the bottom margin, so that I always know which film each photo was shot on.
40. As a shopper, I want the polaroids in one horizontal row that I can swipe or scroll, so that the section feels like flicking through prints.
41. As a shopper on desktop, I want previous and next buttons beside the row, so that I can move through the prints without a trackpad.
42. As a shopper, I want each polaroid to drop into place with a slight tilt as it scrolls into view, and to straighten and lift when I hover it, so that the prints feel physical.
43. As a shopper, I want clicking a polaroid to take me to the Film Roll it was shot on, so that I can buy that film.
44. As a shopper, I want the Sample Photos on a dark full-bleed band, so that the photos stand out.

### Footer

45. As a shopper, I want a dark full-bleed footer with the stacked logo in cream, so that the page ends with the brand.
46. As a shopper, I want the footer to keep the contact details, policy links and social links, now in English, so that I can still find them.

### Products page (temporary)

47. As a shopper, I want a Products page that shows the Featured Products for each Product Type, so that I can still browse after the rows leave the homepage.
48. As a shopper, I want tabs for All, Digital cameras, Film cameras and Film rolls, so that I can narrow the page to one Product Type.
49. As a shopper, I want the tab I'm on to be clearly marked and reflected in the URL (`/products?type=film-camera`), so that I can share or come back to it.
50. As a shopper, I want each Product Type's "View all" link and the header drop-down to land on the right tab, so that every path to a Product Type works.

### Product cards

51. As a shopper, I want a Digital Camera or Film Camera card to show that exact camera, and a Film Roll card to show that film's box or cartridge, so that I know what I'm buying at a glance.
52. As a shopper, I want Sample Photos kept off product cards (they belong on the product's own page), so that cards never show a landscape where a camera should be.
53. As a shopper, I want minimal cards (a large photo, with name and price on one line beneath), so that the products, not the chrome, stand out.
54. As a shopper, I want a Film Camera card to show its Condition Grade badge on the photo, so that I can judge condition before clicking.
55. As a shopper, I want a round "+" button on the photo to add the product to my Cart; on devices with hover it appears when I hover the card, on touch screens it is always shown, so that adding is one tap.
56. As a shopper, I want the "+" to turn into a check, and stop adding, once that Film Camera is in my Cart, so that I don't try to buy a unique item twice.
57. As a screen-reader user, I want the add button named "Add to cart" (or "In your cart") and described by the product's name, and an "Added to cart" announcement after adding, so that I know what happened.
58. As a shopper, I want an Out of Stock card to say "Out of stock" instead of offering the add button, so that I don't try to buy it.
59. As a shopper, I want clicking anywhere else on a card to open the product, so that the whole card is a big target.

### Motion and feedback

60. As a shopper, I want sections and cards to fade and rise into place once as I scroll to them, with cards in a row staggered, so that the page feels alive without being busy.
61. As a shopper, I want those reveals to happen only once, not again when I scroll back up, so that nothing flickers.
62. As a shopper, I want cards to lift slightly with the photo zooming gently when I hover, so that I can tell what I'm pointing at.
63. As a shopper, I want buttons to press in slightly when I click them, so that clicks feel physical.
64. As a shopper, I want text links to get an underline that slides in on hover, so that links are clearly interactive.
65. As a shopper, I want the header Cart icon to bounce and its count to pulse when I add something, so that I can see the Cart has changed.
66. As a shopper who prefers reduced motion, I want the entrance sequence, film strip, ticker, crossfades, logo spin and scroll reveals to be still or a quick fade, so that the site doesn't make me uncomfortable.

### Loading and errors

67. As a shopper, I want a placeholder row of blank polaroids while the Sample Photos load, so that the page doesn't jump when they arrive.
68. As a shopper, I want a clear English message with a "Try again" button if the Sample Photos fail to load, so that I can recover without reloading.
69. As a shopper, I want the Products page to show the same loading and error behaviour for its rows, so that it is never silently empty.

### Placeholders

70. As a shopper, I want "Start your portfolio" and "Ask the assistant" to lead to Portfolio and AI assistant pages that say they're under construction, so that the buttons never lead nowhere.
71. As a shopper, I want every placeholder page in English, so that the site is consistent.

### Seed data

72. As the owner demoing the site, I want every seeded product to have real photos of that product, so that the demo looks like a real camera shop.
73. As the owner, I want each seeded photo's licence and source recorded next to it, so that I know it's only demo data and where it came from.
74. As the owner, I want seeded product descriptions and Film Camera condition notes in English, so that the demo matches the English storefront.

## Implementation Decisions

**Language and routes**

- English only, no i18n layer (ADR 0004). Every user-visible string, accessible name and announcement is rewritten in natural English, not translated word for word. The page language attribute becomes English.
- `formatVnd` produces `₫12,500,000`: English digit grouping with the ₫ sign in front.
- The route module becomes the single source of English paths: `/products`, `/products/:slug`, `/checkout`, `/login`, `/search`, `/shipping-policy`, `/returns-policy`, `/portfolio`, `/assistant`. The Vietnamese routes are dropped with no redirects (no real users or search rankings to keep).
- Product Types no longer get routes of their own. Each Product Type gets an English label (Digital cameras, Film cameras, Film rolls), a `?type=` value (`digital-camera`, `film-camera`, `film-roll`) and a path to `/products?type=…`.

**Layout and theme**

- The ~1152px page column is replaced by full-bleed bands. Content inside each band sits in a shared frame of ~1440px with fluid side margins (16px on phones, growing on larger screens).
- Theme tokens stay the same. Two band colours are added: a warm beige for the Sharing Spotlight and an espresso brown for the AI Spotlight. Dark bands (Sample Photos, footer) use ink.

**Logo**

- A proper SVG redraw of the original artwork: the eight split petals around a central eye with a highlight, and the "EYE SOUL" wordmark set in Playfair Display Bold capitals. Colour comes from the surrounding text colour, so the same logo works on light and dark backgrounds.
- Three forms: mark plus wordmark side by side (header), mark above wordmark (footer, in cream), mark alone (hero, which turns once after the entrance).
- The header logo link keeps the accessible name "Eye Soul, home". The prototype's quick SVG is only a reference.

**Header**

- The three Product Type links are replaced by one "Products" link to `/products`.
- On large screens, hover or focus inside opens a drop-down of three tiles (Product Photo plus label) linking to `/products?type=…`. Keyboard focus moving into the drop-down keeps it open.
- In the phone menu, the three Product Types sit indented under Products.
- The header stays sticky and full-bleed. Past the hero it gets shorter, with a shadow and a translucent blurred background. It never hides.

**Hero**

Replaces the dark Ken Burns hero entirely. The region keeps an accessible name ("About Eye Soul").

- Content, centred: the logo mark, a serif headline "Slow down, [photo pill] look closer." with the second line in italics, the short line, and two buttons. "Shop film cameras" is amber and links to `/products?type=film-camera`. "See sample photos" is an outlined button that smooth-scrolls to the Sample Photo section (the section keeps a scroll margin so the sticky header doesn't cover its heading).
- Photo pill: about 3 hard-coded photos bundled with the web app, crossfading every ~3s.
- Film strip: about 12 hard-coded photos bundled with the web app, purely decorative (hidden from assistive tech, not clickable). The strip is a dark full-bleed band with sprocket-hole edges and amber frame numbers. It scrolls endlessly to the left (~45s per loop) and pauses on hover.
- Commitments ticker: an amber band under the strip, scrolling endlessly the other way (~30s per loop). The three commitments use no numbers until real policies exist.
- The hero needs no API data, so it renders and animates immediately.
- Until the owner supplies real photos, the hard-coded photos are placeholders with the same shape.
- Entrance sequence (from the prototype): logo at 0s; headline words from 0.3s, ~0.08s apart; pill opens horizontally at ~0.7s; short line ~1.0s; buttons ~1.1s; strip rises in at ~1.25s. The logo turns once starting ~1.7s.

**Spotlights**

- A Spotlight section replaces the Featured Product rows on the homepage. It holds three bands, zigzag, each full-bleed: copy on one side, visual on the other, sides alternating. The background sequence is paper, then beige, then espresso.
- Products: kicker "01 · The shop", headline, body, and photographer quotes rotating every ~5s (Ansel Adams, Dorothea Lange, Henri Cartier-Bresson). CTA "Browse products" goes to `/products`. The visual is a seeded film camera Product Photo and a film roll Product Photo, overlapping and tilted.
- Sharing: kicker "02 · Your portfolio". CTA "Start your portfolio" goes to `/portfolio`. The visual is a mock portfolio card (avatar, handle, camera and film line, 3×2 photo grid).
- AI assistant: kicker "03 · AI assistant". CTA "Ask the assistant" goes to `/assistant`. The visual is a mock chat about film for night street shooting and metering neon, plus exposure chips (ISO, aperture, shutter, EV).
- No "Coming soon" labels.
- Spotlight content is static, defined in the web app. Each band is a labelled region.
- Reveal timings (from the prototype): triggered once when ~30% of the band is in view.
  - Copy lines rise ~48px over 1.2s, staggered 0.3s apart, starting 0.15s in.
  - The visual grows from 85% scale and 60px down over 1.6s, starting ~0.6s later.
  - In the Products visual, the camera slides in from the left at ~1.0s and the film roll from the right at ~1.4s, each over 1.4s, settling into their tilt.
  - Easing: a soft ease-out.

**Sample Photos**

- Polaroid row on an ink band: a white frame with the photo square-cropped, and the Film Roll name in serif italic in the bottom margin, always visible.
- The row scrolls horizontally with snap. Previous and next buttons (named "Previous photos" and "Next photos") scroll by most of a screen width. Each polaroid links to its Film Roll.
- Polaroids get small alternating tilts (−3° to +3°) that drop in with a spring as they scroll into view, and straighten, lift and grow slightly on hover.
- The heading keeps its id and becomes "Shot on our film", with kicker "Real photos · Shot on film".

**Footer**

- Ink, full-bleed, with the stacked logo in cream.
- Same content as today, in English: Policies (Shipping policy, Returns policy), Follow us (social links named "Eye Soul on …"), and contact details.

**Products page (temporary stand-in)**

- `/products` shows the same Featured Product rows the homepage used to show, filtered by `?type=`, with tabs All / Digital cameras / Film cameras / Film rolls. The active tab is marked as the current page.
- It reuses the homepage API response's rows. The API is unchanged.
- Row titles become English (e.g. "Featured · Each one is unique / Film cameras"). Each row's "View all" goes to that Product Type's tab.
- The real Products page (full listing, sorting, paging, its own API) is a separate feature and replaces this page.

**Product card**

- No card chrome. A 4:5 photo with rounded corners and grain shows the product's first Product Photo, which is already what the API sends.
- The Condition Grade badge sits top-left on the photo.
- A round "+" add button sits bottom-right on the photo. On hover-capable screens it is revealed on hover; on touch screens it is always visible.
- Name and price sit on one line under the photo. The name link is stretched over the whole card.
- Out of Stock shows an "Out of stock" chip instead of the button.
- The add button keeps today's add-to-cart behaviour, including the Film-Camera-already-in-Cart rule, the accessible name described by the product name, and the polite "Added to cart" status announcement. Only its look changes.
- The same card is used wherever product cards appear (the Products page rows). Search suggestions keep their own compact rows.

**Motion system**

- Built on the existing animation library.
- Shared behaviours:
  - Scroll reveal (once, staggered): fade and rise.
  - Hover lift on cards, with a slow photo zoom.
  - Pressed state on buttons: scale to 0.97.
  - Underline slide-in on text links.
  - Cart feedback: after an add, the header Cart icon bounces and the count pulses.
- Every animation respects reduced motion: the entrance and reveals become a quick fade, and the strip, ticker, crossfades and logo spin stop.
- Endless strips use a CSS marquee with a pause-on-hover state.

**Loading and error states**

- Homepage: the hero and Spotlights render without data. Only the Sample Photo band waits on the homepage API.
  - Its skeleton is a row of blank polaroids, a polite status named "Loading photos".
  - Its error says the photos couldn't load and offers "Try again". The error stays up during a retry, as today.
- The Products page uses the existing product skeleton and error messages, translated to English.

**Seed data**

- Each seeded product's Product Photos (1–2 each; the first is the card photo) are real, freely licensed photos of that model from Wikimedia Commons.
- They are kept in a separate seed photo map with URL, licence and source page for each photo, so attribution travels with the data. Seeding fails loudly if a product has no photo.
- The prototype branch already holds a vetted map with every URL checked to load.
- Product names, photo alt text, descriptions and Film Camera condition notes are rewritten in English (e.g. "Kodak Portra 400 – 35mm – 36 exp", "Canon EOS R8 with 24-50mm").
- Sample Photos are free photos from the Unsplash "film photography" search, each used once, with licence and source recorded in the seed photo map (owner request, 2026-10-16; previously placeholder images).

**Clean-up**

- The old dark hero, the Vietnamese route constants and the masonry Sample Photo grid and its skeleton pattern are removed.
- No prototype code (variant switcher, `*Prototype` components) lands on master. Everything is rewritten properly from the prototype's verdicts.

## Testing Decisions

- **One seam: the whole web app.** Tests render it through the existing app renderer at a given path, with the API mocked at the HTTP boundary by MSW. They query by role and accessible name and assert what a shopper can see and do, never component structure, class names or animation state.
- **Test infrastructure:** jsdom has no `IntersectionObserver`, which scroll reveals need, so the shared test setup stubs it; elements simply render in their final state. Animations themselves are not tested.
- **Modules covered through that seam:**
  - English copy and routes, VND formatting (`₫12,500,000`).
  - The header Products link and drop-down links.
  - Both hero buttons: the film camera link and the "See sample photos" target.
  - The three Spotlight CTAs and their destinations, including the Portfolio and AI assistant placeholders.
  - The Sample Photo polaroids: Film Roll names and links, and previous/next buttons present.
  - The Products page: rows, tabs, `?type=` filtering, "View all" links, current tab marked.
  - The product card: name, price, Product Photo, Condition Grade, Out of stock, add to Cart via "+", Film Camera already in Cart, accessible description, "Added to cart" announcement.
  - Header Cart count after adding.
  - Loading and error states for Sample Photos and the Products page.
- **Prior art:** the existing homepage, header, footer, Cart and search tests. Each existing test is rewritten in English against the new routes rather than deleted. Behaviours that moved, such as the Featured Product rows now on `/products`, move their tests with them.
- **API:** no new tests. The homepage endpoint and its e2e tests are unchanged.
- **Seed:** no automated test. A missing photo fails the seed loudly, and the photo URLs were checked when the map was built.
- **Visual review:** the owner checks the look and motion against the prototype by eye. Lighthouse and accessibility scoring are not part of this work.

## Out of Scope

- The real Products page: full listing, sorting, filters beyond Product Type, paging, and its API.
- Photo sharing and portfolios, and the AI assistant. Their Spotlights only link to placeholder pages; each is a separate feature needing its own design work (photo sharing also needs real accounts; sign-in is still a stub).
- Real photography: the hero pill and film strip photos, and the shop's own Product Photos. The owner supplies these later; hand-holding-product cut-outs are no longer needed now that the hero has no Product Type cards.
- Vietnamese or any second language, and redirects from the old Vietnamese routes.
- Real shipping and returns policies, and any numeric promises in the commitments.
- Product Detail, checkout, search results and login pages beyond translating their placeholders.
- Lighthouse and performance targets, and further accessibility audits.

## Further Notes

- Prototype branch `prototype/ui-polish` holds every explored variant and the verdicts in its commit message:
  - Hero: A, B and C explored; C won.
  - Card: A, B and C explored; A won.
  - Sample Photos: A, B and C explored; C won.
  - Spotlights: A, B and C explored; A won.
- The prototype's tests are knowingly red: they assert the old Vietnamese copy.
- Database state: the developer database was seeded from the prototype branch (English names, Wikimedia photos). Re-running the seed on master before this work lands brings back the old picsum data.
- The shop's commitments and the Spotlight copy are first drafts. The owner can reword them freely.
- Hero placeholders keep the photo pill and strip slots ready for real photos dropped into the web app's public folder.
