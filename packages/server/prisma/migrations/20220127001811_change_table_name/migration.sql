/*
  Warnings:

  - You are about to drop the `cashtransactionlog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currentportfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favoritestock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stocktransactionlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cashtransactionlog` DROP FOREIGN KEY `fk_cash_transaction_log_portfolio_portfolio_id`;

-- DropForeignKey
ALTER TABLE `currentportfolio` DROP FOREIGN KEY `fk_current_portfolio_portfolio_portfolio_id`;

-- DropForeignKey
ALTER TABLE `currentportfolio` DROP FOREIGN KEY `fk_current_portfolio_user_user_id`;

-- DropForeignKey
ALTER TABLE `favoritestock` DROP FOREIGN KEY `fk_favorite_stock_user_user_id`;

-- DropForeignKey
ALTER TABLE `stocktransactionlog` DROP FOREIGN KEY `fk_stock_transaction_log_portfolio_portfolio_id`;

-- DropTable
DROP TABLE `cashtransactionlog`;

-- DropTable
DROP TABLE `currentportfolio`;

-- DropTable
DROP TABLE `favoritestock`;

-- DropTable
DROP TABLE `stocktransactionlog`;

-- CreateTable
CREATE TABLE `favorite_stock` (
    `user_id` INTEGER NOT NULL,
    `ticker` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`user_id`, `ticker`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cash_transaction_log` (
    `cash_transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `portfolio_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `memo` TEXT NULL,
    `transaction_type` ENUM('deposit', 'withdraw', 'purchased', 'sold', 'dividend') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_cash_transaction_log_portfolio_portfolio_id_idx`(`portfolio_id`),
    PRIMARY KEY (`cash_transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `current_portfolio` (
    `user_id` INTEGER NOT NULL,
    `portfolio_id` INTEGER NOT NULL,

    INDEX `fk_current_portfolio_portfolio_portfolio_id_idx`(`portfolio_id`),
    PRIMARY KEY (`user_id`, `portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_transaction_log` (
    `stock_transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `portfolio_id` INTEGER NOT NULL,
    `ticker` VARCHAR(7) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `memo` TEXT NULL,
    `transaction_type` ENUM('buy', 'sell') NOT NULL,
    `is_realized` TINYINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_stock_transaction_log_portfolio_portfolio_id_idx`(`portfolio_id`),
    PRIMARY KEY (`stock_transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorite_stock` ADD CONSTRAINT `fk_favorite_stock_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_transaction_log` ADD CONSTRAINT `fk_cash_transaction_log_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `current_portfolio` ADD CONSTRAINT `fk_current_portfolio_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `current_portfolio` ADD CONSTRAINT `fk_current_portfolio_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transaction_log` ADD CONSTRAINT `fk_stock_transaction_log_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;
