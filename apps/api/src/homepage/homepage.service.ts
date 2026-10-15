import { Injectable } from '@nestjs/common';
import { ConditionGrade as PrismaConditionGrade, Prisma } from '@prisma/client';
import type { ConditionGrade, HomepageResponse, HomepageRow, ProductCard, ProductType } from '@eyesoul/shared';
import { PrismaService } from '../prisma/prisma.service';

const ROW_SIZE = 4;
const ROW_ORDER: ProductType[] = ['DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL'];

const CONDITION_GRADES: Record<PrismaConditionGrade, ConditionGrade> = { A_PLUS: 'A+', A: 'A', B: 'B', C: 'C' };

const cardInclude = {
  photos: { orderBy: { position: 'asc' }, take: 1 },
} satisfies Prisma.ProductInclude;

type CardProduct = Prisma.ProductGetPayload<{ include: typeof cardInclude }>;

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomepage(): Promise<HomepageResponse> {
    const rows = await Promise.all(ROW_ORDER.map((productType) => this.featuredRow(productType)));
    return { rows: rows.filter((row) => row.products.length > 0) };
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

function toProductCard(product: CardProduct): ProductCard {
  const [photo] = product.photos;
  return {
    id: product.id,
    slug: product.slug,
    productType: product.productType,
    name: product.name,
    priceVnd: product.priceVnd,
    photo: photo ? { url: photo.url, alt: photo.alt } : null,
    conditionGrade: product.productType === 'FILM_CAMERA' && product.conditionGrade ? CONDITION_GRADES[product.conditionGrade] : null,
    // Film Cameras carry no stock count: an unsold one (the only kind that gets here) is always available.
    availability: product.productType !== 'FILM_CAMERA' && product.stock === 0 ? 'out_of_stock' : 'available',
  };
}
