/*
  Warnings:

  - A unique constraint covering the columns `[product]` on the table `SoldProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product` to the `SoldProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_isProductBought_fkey";

-- AlterTable
ALTER TABLE "SoldProduct" ADD COLUMN     "product" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SoldProduct_product_key" ON "SoldProduct"("product");

-- AddForeignKey
ALTER TABLE "SoldProduct" ADD CONSTRAINT "SoldProduct_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
