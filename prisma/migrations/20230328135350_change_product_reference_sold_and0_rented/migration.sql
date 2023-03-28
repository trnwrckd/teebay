/*
  Warnings:

  - You are about to drop the column `isProductBought` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isProductRented` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `SoldProduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `RentedProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `SoldProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `RentedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_isProductRented_fkey";

-- DropForeignKey
ALTER TABLE "SoldProduct" DROP CONSTRAINT "SoldProduct_product_fkey";

-- DropIndex
DROP INDEX "Product_isProductBought_key";

-- DropIndex
DROP INDEX "Product_isProductRented_key";

-- DropIndex
DROP INDEX "SoldProduct_product_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isProductBought",
DROP COLUMN "isProductRented";

-- AlterTable
ALTER TABLE "RentedProduct" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SoldProduct" DROP COLUMN "product";

-- CreateIndex
CREATE UNIQUE INDEX "RentedProduct_productId_key" ON "RentedProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SoldProduct_productId_key" ON "SoldProduct"("productId");

-- AddForeignKey
ALTER TABLE "RentedProduct" ADD CONSTRAINT "RentedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldProduct" ADD CONSTRAINT "SoldProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
