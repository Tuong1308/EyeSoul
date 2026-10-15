-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL');

-- CreateEnum
CREATE TYPE "ConditionGrade" AS ENUM ('A+', 'A', 'B', 'C');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "productType" "ProductType" NOT NULL,
    "name" TEXT NOT NULL,
    "priceVnd" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "soldAt" TIMESTAMP(3),
    "conditionGrade" "ConditionGrade",
    "conditionNote" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredRank" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPhoto" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "ProductPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SamplePhoto" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SamplePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_productType_featured_featuredRank_idx" ON "Product"("productType", "featured", "featuredRank");

-- CreateIndex
CREATE INDEX "Product_productType_createdAt_idx" ON "Product"("productType", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPhoto_productId_position_key" ON "ProductPhoto"("productId", "position");

-- CreateIndex
CREATE INDEX "SamplePhoto_productId_createdAt_idx" ON "SamplePhoto"("productId", "createdAt");

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "ProductPhoto_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SamplePhoto" ADD CONSTRAINT "SamplePhoto_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
