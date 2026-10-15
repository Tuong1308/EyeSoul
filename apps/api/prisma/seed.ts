import { ConditionGrade, PrismaClient, ProductType } from '@prisma/client';

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
}

// Film Rolls are deliberately left without featured products, so their row shows the newest-first fallback.
const products: SeedProduct[] = [
  // Digital Cameras
  { slug: 'fujifilm-x100vi', productType: 'DIGITAL_CAMERA', name: 'Fujifilm X100VI', priceVnd: 45_990_000, stock: 4, featuredRank: 1,
    description: 'Máy ảnh compact ống kính cố định 23mm f/2, cảm biến 40MP với giả lập phim Fujifilm.' },
  { slug: 'sony-a7-iv-body', productType: 'DIGITAL_CAMERA', name: 'Sony A7 IV (Body)', priceVnd: 52_990_000, stock: 6, featuredRank: 2,
    description: 'Full-frame 33MP, quay 4K 60p, lấy nét mắt theo thời gian thực. Chỉ thân máy.' },
  { slug: 'canon-eos-r8-kit-24-50', productType: 'DIGITAL_CAMERA', name: 'Canon EOS R8 kèm Kit 24-50mm', priceVnd: 37_490_000, stock: 3,
    description: 'Full-frame nhỏ gọn cho người mới, kèm ống kính kit RF 24-50mm f/4.5-6.3.' },
  { slug: 'nikon-zf-body', productType: 'DIGITAL_CAMERA', name: 'Nikon Zf (Body)', priceVnd: 44_990_000, stock: 2,
    description: 'Thiết kế hoài cổ lấy cảm hứng từ Nikon FM2, cảm biến full-frame 24.5MP.' },
  { slug: 'ricoh-gr-iiix', productType: 'DIGITAL_CAMERA', name: 'Ricoh GR IIIx', priceVnd: 26_990_000, stock: 0,
    description: 'Máy ảnh đường phố bỏ túi, ống kính 40mm tương đương, cảm biến APS-C.' },
  { slug: 'fujifilm-x-t50-kit-15-45', productType: 'DIGITAL_CAMERA', name: 'Fujifilm X-T50 kèm Kit 15-45mm', priceVnd: 36_490_000, stock: 5,
    description: 'Vòng xoay giả lập phim ngay trên thân máy, cảm biến 40MP, chống rung trong thân.' },
  { slug: 'panasonic-lumix-s9-body', productType: 'DIGITAL_CAMERA', name: 'Panasonic Lumix S9 (Body)', priceVnd: 33_990_000, stock: 2,
    description: 'Full-frame siêu gọn nhẹ, hỗ trợ LUT màu ngay trên máy.' },

  // Film Cameras: each one a unique used unit
  { slug: 'leica-m6-1986-sold', productType: 'FILM_CAMERA', name: 'Leica M6 (1986)', priceVnd: 89_000_000, sold: true, featuredRank: 1,
    condition: { grade: 'A_PLUS', note: 'Gần như mới, đo sáng chuẩn, không trầy xước đáng kể.' },
    description: 'Máy rangefinder huyền thoại, khung ngắm 0.72x, đã bảo dưỡng tại Nhật.' },
  { slug: 'canon-ae-1-program', productType: 'FILM_CAMERA', name: 'Canon AE-1 Program', priceVnd: 7_500_000, featuredRank: 2,
    condition: { grade: 'A', note: 'Hoạt động tốt, có vài vết xước nhẹ ở nắp đáy.' },
    description: 'Máy SLR phổ biến nhất thập niên 80, kèm ống kính FD 50mm f/1.8.' },
  { slug: 'nikon-fm2-chrome', productType: 'FILM_CAMERA', name: 'Nikon FM2 Chrome', priceVnd: 9_800_000, featuredRank: 3,
    condition: { grade: 'A', note: 'Cơ hoàn toàn, màn trập titan, mép da hơi bong ở góc trái.' },
    description: 'Máy cơ bền bỉ, tốc độ tới 1/4000s, không cần pin để chụp.' },
  { slug: 'olympus-mju-ii', productType: 'FILM_CAMERA', name: 'Olympus µ[mju:] II', priceVnd: 6_200_000,
    condition: { grade: 'B', note: 'Đèn flash yếu, nắp trượt hơi rít khi mở.' },
    description: 'Máy compact ống kính 35mm f/2.8, chống nước nhẹ, rất được giới trẻ yêu thích.' },
  { slug: 'pentax-k1000', productType: 'FILM_CAMERA', name: 'Pentax K1000', priceVnd: 4_500_000,
    condition: { grade: 'C', note: 'Kính ngắm có bụi, đo sáng lệch khoảng 1 stop.' },
    description: 'Máy học nhiếp ảnh kinh điển, hoàn toàn cơ, kèm ống kính SMC 50mm f/2.' },
  { slug: 'contax-t2', productType: 'FILM_CAMERA', name: 'Contax T2', priceVnd: 24_000_000,
    condition: { grade: 'A', note: 'Thân titan còn đẹp, màn LCD rõ, có hộp và dây đeo.' },
    description: 'Compact cao cấp với ống kính Carl Zeiss Sonnar 38mm f/2.8.' },
  { slug: 'minolta-x-700', productType: 'FILM_CAMERA', name: 'Minolta X-700', priceVnd: 5_300_000,
    condition: { grade: 'B', note: 'Gioăng chống sáng đã thay mới, thân có vết mòn sơn.' },
    description: 'SLR chế độ Program, kèm ống kính MD Rokkor 50mm f/1.7.' },

  // Film Rolls
  { slug: 'kodak-portra-400-35mm-36', productType: 'FILM_ROLL', name: 'Kodak Portra 400 – 35mm – 36 kiểu', priceVnd: 420_000, stock: 40,
    description: 'Phim màu negative, tông da ấm, latitude rộng, hợp chụp chân dung.' },
  { slug: 'kodak-portra-400-120', productType: 'FILM_ROLL', name: 'Kodak Portra 400 – 120', priceVnd: 380_000, stock: 12,
    description: 'Phiên bản medium format của Portra 400 cho máy 6x6, 6x7.' },
  { slug: 'fujifilm-c200-35mm-36', productType: 'FILM_ROLL', name: 'Fujifilm C200 – 35mm – 36 kiểu', priceVnd: 165_000, stock: 0,
    description: 'Phim màu giá mềm, màu xanh mát đặc trưng của Fuji.' },
  { slug: 'ilford-hp5-plus-35mm-36', productType: 'FILM_ROLL', name: 'Ilford HP5 Plus 400 – 35mm – 36 kiểu', priceVnd: 230_000, stock: 25,
    description: 'Phim đen trắng ISO 400, hạt mịn, đẩy ISO tốt.' },
  { slug: 'kodak-gold-200-35mm-36', productType: 'FILM_ROLL', name: 'Kodak Gold 200 – 35mm – 36 kiểu', priceVnd: 190_000, stock: 60,
    description: 'Phim màu ấm áp, màu vàng nắng, lựa chọn quen thuộc cho ngày đẹp trời.' },
  { slug: 'cinestill-800t-35mm-36', productType: 'FILM_ROLL', name: 'CineStill 800T – 35mm – 36 kiểu', priceVnd: 480_000, stock: 8,
    description: 'Phim điện ảnh cân bằng tungsten, quầng sáng đỏ đặc trưng khi chụp đêm.' },
  { slug: 'kodak-ektar-100-35mm-36', productType: 'FILM_ROLL', name: 'Kodak Ektar 100 – 35mm – 36 kiểu', priceVnd: 350_000, stock: 15,
    description: 'Hạt mịn nhất trong dòng phim màu negative, màu bão hoà cho phong cảnh.' },
];

async function main() {
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
          create: [
            { url: `https://picsum.photos/seed/${p.slug}-1/800/800`, alt: `${p.name}, ảnh chính`, position: 1 },
            { url: `https://picsum.photos/seed/${p.slug}-2/800/800`, alt: `${p.name}, góc khác`, position: 2 },
          ],
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
