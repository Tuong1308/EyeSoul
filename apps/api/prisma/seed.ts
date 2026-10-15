import { ConditionGrade, PrismaClient, ProductType } from '@prisma/client';
import { PRODUCT_PHOTOS } from './seed-photos';

const prisma = new PrismaClient();

interface SeedProduct {
  slug: string;
  productType: ProductType;
  name: string;
  priceVnd: number;
  description: string;
  stock?: number;
  sold?: boolean;
  condition?: { grade: ConditionGrade; note: string };
  featuredRank?: number;
  /** How many Sample Photos were shot with this product. */
  samplePhotos?: number;
}

// Film Rolls are deliberately left without featured products, so their row shows the newest-first fallback.
// One Out of Stock Digital Camera and one Out of Stock Film Roll land on the homepage, so "Out of stock" is visible.
// Only 5 Film Rolls have Sample Photos (16 in all), so the homepage tops up past one photo per Film Roll.
// A few cameras have Sample Photos too; the homepage must leave those out.
const products: SeedProduct[] = [
  // Digital Cameras
  { slug: 'fujifilm-x100vi', productType: 'DIGITAL_CAMERA', name: 'Fujifilm X100VI', priceVnd: 45_990_000, stock: 4, featuredRank: 1, samplePhotos: 2,
    description: 'Fixed-lens compact with a 23mm f/2 lens, a 40MP sensor and Fujifilm film simulations.' },
  { slug: 'sony-a7-iv-body', productType: 'DIGITAL_CAMERA', name: 'Sony A7 IV (Body)', priceVnd: 52_990_000, stock: 6, featuredRank: 2,
    description: '33MP full-frame, 4K 60p video and real-time eye autofocus. Body only.' },
  { slug: 'canon-eos-r8-kit-24-50', productType: 'DIGITAL_CAMERA', name: 'Canon EOS R8 with 24-50mm', priceVnd: 37_490_000, stock: 3,
    description: 'A compact full-frame for beginners, with the RF 24-50mm f/4.5-6.3 kit lens.' },
  { slug: 'nikon-zf-body', productType: 'DIGITAL_CAMERA', name: 'Nikon Zf (Body)', priceVnd: 44_990_000, stock: 2,
    description: 'Retro design inspired by the Nikon FM2, with a 24.5MP full-frame sensor.' },
  { slug: 'ricoh-gr-iiix', productType: 'DIGITAL_CAMERA', name: 'Ricoh GR IIIx', priceVnd: 26_990_000, stock: 0, featuredRank: 3,
    description: 'A pocket street camera with a 40mm-equivalent lens and an APS-C sensor.' },
  { slug: 'fujifilm-x-t50-kit-15-45', productType: 'DIGITAL_CAMERA', name: 'Fujifilm X-T50 with 15-45mm', priceVnd: 36_490_000, stock: 5,
    description: 'A film simulation dial right on the body, a 40MP sensor and in-body stabilisation.' },
  { slug: 'panasonic-lumix-s9-body', productType: 'DIGITAL_CAMERA', name: 'Panasonic Lumix S9 (Body)', priceVnd: 33_990_000, stock: 2,
    description: 'An ultra-light full-frame that applies colour LUTs in camera.' },

  // Film Cameras: each one a unique used unit
  { slug: 'leica-m6-1986-sold', productType: 'FILM_CAMERA', name: 'Leica M6 (1986)', priceVnd: 89_000_000, sold: true, featuredRank: 1,
    condition: { grade: 'A_PLUS', note: 'Near mint, accurate metering, no notable scratches.' },
    description: 'The legendary rangefinder with a 0.72x viewfinder, serviced in Japan.' },
  { slug: 'canon-ae-1-program', productType: 'FILM_CAMERA', name: 'Canon AE-1 Program', priceVnd: 7_500_000, featuredRank: 2, samplePhotos: 2,
    condition: { grade: 'A', note: 'Works well, with a few light scratches on the base plate.' },
    description: 'The most popular SLR of the 1980s, with an FD 50mm f/1.8 lens.' },
  { slug: 'nikon-fm2-chrome', productType: 'FILM_CAMERA', name: 'Nikon FM2 Chrome', priceVnd: 9_800_000, featuredRank: 3,
    condition: { grade: 'A', note: 'Fully mechanical, titanium shutter; the leatherette is lifting slightly at the left corner.' },
    description: 'A tough mechanical body with speeds up to 1/4000s; no battery needed to shoot.' },
  { slug: 'olympus-mju-ii', productType: 'FILM_CAMERA', name: 'Olympus µ[mju:] II', priceVnd: 6_200_000,
    condition: { grade: 'B', note: 'Weak flash; the sliding cover is a little stiff to open.' },
    description: 'A weather-resistant compact with a 35mm f/2.8 lens, much loved by young shooters.' },
  { slug: 'pentax-k1000', productType: 'FILM_CAMERA', name: 'Pentax K1000', priceVnd: 4_500_000,
    condition: { grade: 'C', note: 'Dust in the viewfinder; metering is about 1 stop off.' },
    description: 'The classic camera for learning photography, fully mechanical, with an SMC 50mm f/2 lens.' },
  { slug: 'contax-t2', productType: 'FILM_CAMERA', name: 'Contax T2', priceVnd: 24_000_000,
    condition: { grade: 'A', note: 'Titanium body in great shape, clear LCD, comes with box and strap.' },
    description: 'A premium compact with a Carl Zeiss Sonnar 38mm f/2.8 lens.' },
  { slug: 'minolta-x-700', productType: 'FILM_CAMERA', name: 'Minolta X-700', priceVnd: 5_300_000,
    condition: { grade: 'B', note: 'Light seals replaced; some paint wear on the body.' },
    description: 'An SLR with Program mode, with an MD Rokkor 50mm f/1.7 lens.' },

  // Film Rolls
  { slug: 'kodak-portra-400-35mm-36', productType: 'FILM_ROLL', name: 'Kodak Portra 400 – 35mm – 36 exp', priceVnd: 420_000, stock: 40, samplePhotos: 5,
    description: 'Colour negative film with warm skin tones and wide latitude, made for portraits.' },
  { slug: 'kodak-portra-400-120', productType: 'FILM_ROLL', name: 'Kodak Portra 400 – 120', priceVnd: 380_000, stock: 12,
    description: 'The medium format version of Portra 400 for 6x6 and 6x7 cameras.' },
  { slug: 'ilford-hp5-plus-35mm-36', productType: 'FILM_ROLL', name: 'Ilford HP5 Plus 400 – 35mm – 36 exp', priceVnd: 230_000, stock: 25, samplePhotos: 4,
    description: 'ISO 400 black-and-white film with fine grain that pushes well.' },
  { slug: 'kodak-gold-200-35mm-36', productType: 'FILM_ROLL', name: 'Kodak Gold 200 – 35mm – 36 exp', priceVnd: 190_000, stock: 60, samplePhotos: 3,
    description: 'Warm colour film with sunny yellows, the go-to choice for a bright day.' },
  { slug: 'cinestill-800t-35mm-36', productType: 'FILM_ROLL', name: 'CineStill 800T – 35mm – 36 exp', priceVnd: 480_000, stock: 8, samplePhotos: 3,
    description: 'Tungsten-balanced cinema film, with its signature red halation at night.' },
  { slug: 'kodak-ektar-100-35mm-36', productType: 'FILM_ROLL', name: 'Kodak Ektar 100 – 35mm – 36 exp', priceVnd: 350_000, stock: 15, samplePhotos: 1,
    description: 'The finest-grained colour negative film, with saturated colour for landscapes.' },
  // Newest Film Roll, so an Out of Stock card shows in the fallback row.
  { slug: 'fujifilm-c200-35mm-36', productType: 'FILM_ROLL', name: 'Fujifilm C200 – 35mm – 36 exp', priceVnd: 165_000, stock: 0,
    description: 'Affordable colour film with the signature Fuji cool greens.' },
];

// Portrait, landscape and square shots, like real film scans.
const SAMPLE_PHOTO_SIZES = ['800/1000', '1000/700', '900/900'];

async function main() {
  // Fail before touching the database if any product has no Product Photo.
  const missing = products.filter((p) => !PRODUCT_PHOTOS[p.slug]?.length).map((p) => p.slug);
  if (missing.length > 0) {
    throw new Error(`No Product Photo in prisma/seed-photos.ts for: ${missing.join(', ')}`);
  }

  await prisma.product.deleteMany();

  // Later entries are newer, so each Product Type's newest-first order is predictable.
  const start = Date.UTC(2026, 8, 1);
  for (const [index, p] of products.entries()) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        productType: p.productType,
        name: p.name,
        priceVnd: p.priceVnd,
        description: p.description,
        createdAt: new Date(start + index * 86_400_000),
        stock: p.stock ?? 0,
        soldAt: p.sold ? new Date(Date.UTC(2026, 9, 1)) : null,
        conditionGrade: p.condition?.grade ?? null,
        conditionNote: p.condition?.note ?? null,
        featured: p.featuredRank !== undefined,
        featuredRank: p.featuredRank ?? null,
        photos: {
          // Photos *of* the product (the camera body, the film box); position 1 is the card photo.
          create: PRODUCT_PHOTOS[p.slug].map((photo, n) => ({
            url: photo.url,
            alt: n === 0 ? `${p.name}, main photo` : `${p.name}, another angle`,
            position: n + 1,
          })),
        },
        samplePhotos: {
          create: Array.from({ length: p.samplePhotos ?? 0 }, (_, n) => ({
            url: `https://picsum.photos/seed/${p.slug}-sample-${n + 1}/${SAMPLE_PHOTO_SIZES[n % SAMPLE_PHOTO_SIZES.length]}`,
            alt: `Shot on ${p.name} (${n + 1})`,
            // Hours apart, so photos of different products interleave by date.
            createdAt: new Date(Date.UTC(2026, 9, 1) + (n * 7 + index) * 3_600_000),
          })),
        },
      },
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
