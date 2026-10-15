import { Injectable } from '@nestjs/common';
import type { HomepageResponse, HomepageRow, HomepageSamplePhoto, ProductType } from '@eyesoul/shared';
import { cardInclude, toProductCard } from '../catalog/product-card';
import { PrismaService } from '../prisma/prisma.service';

const ROW_SIZE = 4;
const SAMPLE_PHOTO_LIMIT = 12;
const ROW_ORDER: ProductType[] = ['DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL'];

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomepage(): Promise<HomepageResponse> {
    const [rows, samplePhotos] = await Promise.all([
      Promise.all(ROW_ORDER.map((productType) => this.featuredRow(productType))),
      this.samplePhotos(),
    ]);
    return { rows: rows.filter((row) => row.products.length > 0), samplePhotos };
  }

  /** The newest photo of each distinct Film Roll first, then the remaining photos; both newest first. */
  private async samplePhotos(): Promise<HomepageSamplePhoto[]> {
    const photos = await this.prisma.samplePhoto.findMany({
      where: { product: { productType: 'FILM_ROLL' } },
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      include: { product: { select: { slug: true, name: true } } },
    });
    const seen = new Set<string>();
    const firstOfEachRoll: typeof photos = [];
    const rest: typeof photos = [];
    for (const photo of photos) {
      (seen.has(photo.productId) ? rest : firstOfEachRoll).push(photo);
      seen.add(photo.productId);
    }
    return [...firstOfEachRoll, ...rest].slice(0, SAMPLE_PHOTO_LIMIT).map((photo) => ({
      id: photo.id,
      url: photo.url,
      alt: photo.alt,
      filmRoll: photo.product,
    }));
  }

  /** Featured products by rank, topped up with the newest non-featured ones. Sold products never appear. */
  private async featuredRow(productType: ProductType): Promise<HomepageRow> {
    const featured = await this.prisma.product.findMany({
      where: { productType, featured: true, soldAt: null },
      orderBy: { featuredRank: 'asc' },
      take: ROW_SIZE,
      include: cardInclude,
    });
    const newest = await this.prisma.product.findMany({
      where: { productType, featured: false, soldAt: null },
      orderBy: { createdAt: 'desc' },
      take: ROW_SIZE - featured.length,
      include: cardInclude,
    });
    return { productType, products: [...featured, ...newest].map(toProductCard) };
  }
}
