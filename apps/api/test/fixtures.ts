import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma, PrismaClient, ProductType } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/configure-app';

export async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  return app;
}

export const db = new PrismaClient();

export async function resetDatabase() {
  await db.$executeRaw`TRUNCATE "SamplePhoto", "ProductPhoto", "Product" CASCADE`;
}

let counter = 0;

type ProductFixture = Partial<Omit<Prisma.ProductCreateInput, 'productType'>> & {
  productType: ProductType;
  photos?: { url: string; alt: string; position: number }[];
  samplePhotos?: { url: string; alt: string; createdAt: Date }[];
};

/** Inserts a product with sensible defaults; `createdAt` defaults to strictly increasing values. */
export async function createProduct({ photos, samplePhotos, ...data }: ProductFixture) {
  counter += 1;
  return db.product.create({
    data: {
      slug: `product-${counter}`,
      name: `Product ${counter}`,
      priceVnd: 1_000_000,
      description: 'Mô tả',
      stock: 3,
      createdAt: new Date(Date.UTC(2026, 0, 1, 0, counter)),
      ...(data.productType === 'FILM_CAMERA' ? { conditionGrade: 'A', conditionNote: 'Ổn' } : {}),
      ...data,
      photos: photos ? { create: photos } : undefined,
      samplePhotos: samplePhotos ? { create: samplePhotos } : undefined,
    },
  });
}
