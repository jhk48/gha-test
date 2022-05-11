/*
  Warnings:

  - You are about to drop the column `price_diff` on the `stock_transaction_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stock_transaction_log` DROP COLUMN `price_diff`,
    ADD COLUMN `avg_buy_cost` DOUBLE NULL;
