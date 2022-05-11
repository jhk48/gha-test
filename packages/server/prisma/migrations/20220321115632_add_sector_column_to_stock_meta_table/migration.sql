/*
  Warnings:

  - Added the required column `sector` to the `stock_meta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stock_meta` ADD COLUMN `sector` TEXT NOT NULL;
