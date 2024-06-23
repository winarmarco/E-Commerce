/*
  Warnings:

  - Added the required column `estimatedArrivalTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `estimatedArrivalTime` DATETIME(3) NOT NULL,
    ADD COLUMN `orderCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `productCode` VARCHAR(191) NOT NULL;
