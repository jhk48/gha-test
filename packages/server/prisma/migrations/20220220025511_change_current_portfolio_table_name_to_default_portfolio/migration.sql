/*
  Warnings:

  - You are about to drop the `current_portfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `current_portfolio` DROP FOREIGN KEY `fk_current_portfolio_portfolio_portfolio_id`;

-- DropForeignKey
ALTER TABLE `current_portfolio` DROP FOREIGN KEY `fk_current_portfolio_user_user_id`;

-- DropTable
DROP TABLE `current_portfolio`;

-- CreateTable
CREATE TABLE `default_portfolio` (
    `user_id` INTEGER NOT NULL,
    `portfolio_id` INTEGER NOT NULL,

    INDEX `fk_default_portfolio_portfolio_portfolio_id_idx`(`portfolio_id`),
    PRIMARY KEY (`user_id`, `portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `default_portfolio` ADD CONSTRAINT `fk_default_portfolio_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `default_portfolio` ADD CONSTRAINT `fk_default_portfolio_portfolio_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio`(`portfolio_id`) ON DELETE CASCADE ON UPDATE CASCADE;
