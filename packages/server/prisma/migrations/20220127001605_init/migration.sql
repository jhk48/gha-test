-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth_type` ENUM('google', 'kakao', 'naver') NOT NULL,
    `username` VARCHAR(10) NOT NULL,
    `avatar` VARCHAR(41) NULL,
    `currency` CHAR(3) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `portfolio_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `portfolio_name` VARCHAR(20) NOT NULL,
    `privacy` ENUM('public', 'private') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteStock` (
    `user_id` INTEGER NOT NULL,
    `ticker` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`user_id`, `ticker`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CashTransactionLog` (
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
CREATE TABLE `CurrentPortfolio` (
    `user_id` INTEGER NOT NULL,
    `portfolio_id` INTEGER NOT NULL,

    INDEX `fk_current_portfolio_portfolio_portfolio_id_idx`(`portfolio_id`),
    PRIMARY KEY (`user_id`, `portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockTransactionLog` (
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
ALTER TABLE `Portfolio` ADD CONSTRAINT `fk_portfolio_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteStock` ADD CONSTRAINT `fk_favorite_stock_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashTransactionLog` ADD CONSTRAINT `fk_cash_transaction_log_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurrentPortfolio` ADD CONSTRAINT `fk_current_portfolio_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurrentPortfolio` ADD CONSTRAINT `fk_current_portfolio_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockTransactionLog` ADD CONSTRAINT `fk_stock_transaction_log_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;
