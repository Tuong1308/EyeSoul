import { ConditionGrade as PrismaConditionGrade, Prisma } from '@prisma/client';
import type { ConditionGrade, ProductCard } from '@eyesoul/shared';

const CONDITION_GRADES: Record<PrismaConditionGrade, ConditionGrade> = { A_PLUS: 'A+', A: 'A', B: 'B', C: 'C' };

/** What a product query must include to be turned into a ProductCard. */
export const cardInclude = {
  photos: { orderBy: { position: 'asc' }, take: 1 },
} satisfies Prisma.ProductInclude;

type CardProduct = Prisma.ProductGetPayload<{ include: typeof cardInclude }>;

/** Only call this for products that are offered: a Sold Film Camera has no ProductCard. */
export function toProductCard(product: CardProduct): ProductCard {
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
