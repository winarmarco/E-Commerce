/*
  Warnings:

  - You are about to drop the column `productURL` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `productURL`,
    ADD COLUMN `imageURL` VARCHAR(191) NOT NULL;
