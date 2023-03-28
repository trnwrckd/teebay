/*
  Warnings:

  - Added the required column `productId` to the `SoldProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoldProduct" ADD COLUMN     "productId" TEXT NOT NULL;
