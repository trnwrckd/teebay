/*
  Warnings:

  - You are about to drop the column `boughtBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `lentBy` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isProductBought]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isProductRented]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_boughtBy_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_lentBy_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "boughtBy",
DROP COLUMN "lentBy",
ADD COLUMN     "isProductBought" TEXT,
ADD COLUMN     "isProductRented" TEXT;

-- CreateTable
CREATE TABLE "RentedProduct" (
    "id" TEXT NOT NULL,
    "productOwner" TEXT NOT NULL,
    "borrowedBy" TEXT NOT NULL,

    CONSTRAINT "RentedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoldProduct" (
    "id" TEXT NOT NULL,
    "productOwner" TEXT NOT NULL,
    "boughtBy" TEXT NOT NULL,

    CONSTRAINT "SoldProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_isProductBought_key" ON "Product"("isProductBought");

-- CreateIndex
CREATE UNIQUE INDEX "Product_isProductRented_key" ON "Product"("isProductRented");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_isProductBought_fkey" FOREIGN KEY ("isProductBought") REFERENCES "SoldProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_isProductRented_fkey" FOREIGN KEY ("isProductRented") REFERENCES "RentedProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
