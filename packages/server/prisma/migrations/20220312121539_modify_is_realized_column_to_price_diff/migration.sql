/*
  Warnings:

  - You are about to drop the column `is_realized` on the `stock_transaction_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stock_transaction_log` DROP COLUMN `is_realized`,
    ADD COLUMN `price_diff` INTEGER NULL;
