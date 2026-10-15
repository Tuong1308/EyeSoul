# 04: Header, navigation and stub session

Spec: `.scratch/homepage/spec.md`

**What to build:** The header gives shoppers a way home (Eye Soul logo), links to the three Product Types, stays reachable while scrolling, collapses to a compact menu on phones, and shows an account control that reflects signed-in or signed-out state from a stub session until real Auth exists (ADR-0002).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] The logo links to the homepage; the Product Type links lead to the three placeholder listing routes
- [ ] The header stays reachable on scroll and collapses to a compact menu on mobile
- [ ] A stub session source reports signed-out (the default) or signed-in with a display name, and can be switched in development
- [ ] Signed-out: "Đăng nhập" leads to a placeholder login route
- [ ] Signed-in: the header shows the name with a menu containing "Đăng xuất", which switches the stub to signed-out
- [ ] Web tests cover both session states and the navigation links
