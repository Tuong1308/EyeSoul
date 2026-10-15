import { Injectable } from '@nestjs/common';
import type { SearchSuggestionsResponse } from '@eyesoul/shared';
import { cardInclude, toProductCard } from '../catalog/product-card';
import { PrismaService } from '../prisma/prisma.service';

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 8;

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  /** Products of every Product Type whose name contains the query, ignoring case. Sold products never appear. */
  async suggest(query: string): Promise<SearchSuggestionsResponse> {
    const q = query.trim();
    if (q.length < MIN_QUERY_LENGTH) return { products: [] };

    const products = await this.prisma.product.findMany({
      where: { name: { contains: escapeLike(q), mode: 'insensitive' }, soldAt: null },
      orderBy: { name: 'asc' },
      take: MAX_SUGGESTIONS,
      include: cardInclude,
    });
    return { products: products.map(toProductCard) };
  }
}

/** Prisma passes `contains` to LIKE as is: escape its wildcards so a shopper's `%` or `_` matches only itself. */
function escapeLike(text: string) {
  return text.replace(/[\\%_]/g, (char) => `\\${char}`);
}
