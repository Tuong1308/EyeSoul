# 05: Search with instant suggestions

Spec: `.scratch/homepage/spec.md`

**What to build:** A shopper types in the header search box and, from 2 characters, sees up to 8 matching products across all three Product Types (Product Photo, name, Product Type, price), never a Sold Film Camera. They can pick one with the mouse or keyboard to go to that product, or press Enter to go to the search results page.

**Blocked by:** 04

**Status:** done

- [x] The suggestions endpoint returns an empty list for queries under 2 characters after trimming, without querying the database
- [x] Otherwise it returns up to 8 ProductCards whose name matches case-insensitively, across all Product Types, excluding Sold Film Cameras
- [x] The dropdown opens from 2 characters and never shows results from an older query (no stale or flickering results)
- [x] Arrow keys move through suggestions, Enter on a suggestion opens that product, and Escape closes the dropdown
- [x] Enter with no suggestion highlighted goes to the placeholder search results route, carrying the query
- [x] A "no results" message shows when nothing matches
- [x] API tests cover the length threshold, case-insensitivity, cross-type matching, Sold exclusion and the cap; web tests cover the dropdown threshold, keyboard navigation and Enter navigation
