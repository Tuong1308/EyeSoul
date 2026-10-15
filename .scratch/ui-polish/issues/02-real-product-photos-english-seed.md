# 02: Real Product Photos and English seed data

**What to build:** When the owner seeds the database, every product card shows that exact product: a Digital Camera or Film Camera card shows that camera, a Film Roll card shows that film's box or cartridge. Each seeded product has 1–2 real, freely licensed photos of that model from Wikimedia Commons (the first is the card photo), and the licence and source page travel with each photo. Product names, photo alt text, descriptions and Film Camera condition notes are in English. The prototype branch `prototype/ui-polish` already holds a vetted seed photo map with every URL checked; reuse it. See spec (Seed data).

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Every seeded product's Product Photos come from a seed photo map recording URL, licence and source page per photo
- [ ] Seeding fails loudly if any product has no photo
- [ ] Product names are English (e.g. "Kodak Portra 400 – 35mm – 36 exp", "Canon EOS R8 with 24-50mm"); alt text reads "<name>, main photo" / "<name>, another angle"; Sample Photo alt reads "Shot on <name> (n)"
- [ ] Descriptions and Film Camera condition notes are English
- [ ] Sample Photos stay placeholder images
- [ ] API e2e tests still pass; `db:setup` runs cleanly from an empty database
