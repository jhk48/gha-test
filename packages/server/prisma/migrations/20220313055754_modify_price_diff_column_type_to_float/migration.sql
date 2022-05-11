/*
  Warnings:

  - You are about to alter the column `price_diff` on the `stock_transaction_log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `stock_transaction_log` MODIFY `price_diff` DOUBLE NULL;
