import { Injectable } from '@nestjs/common';
import type { HomepageResponse, HomepageRow, ProductType } from '@eyesoul/shared';
import { cardInclude, toProductCard } from '../catalog/product-card';
import { PrismaService } from '../prisma/prisma.service';

const ROW_SIZE = 4;
const ROW_ORDER: ProductType[] = ['DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL'];

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
