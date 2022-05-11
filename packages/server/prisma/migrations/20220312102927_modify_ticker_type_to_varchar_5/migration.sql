/*
  Warnings:

  - The primary key for the `favorite_stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ticker` on the `favorite_stock` table. The data in that column could be lost. The data in that column will be cast from `VarChar(7)` to `VarChar(5)`.
  - You are about to alter the column `ticker` on the `stock_transaction_log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(7)` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE `favorite_stock` DROP PRIMARY KEY,
    MODIFY `ticker` VARCHAR(5) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `ticker`);

-- AlterTable
ALTER TABLE `stock_transaction_log` MODIFY `ticker` VARCHAR(5) NOT NULL;
