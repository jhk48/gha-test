/*
  Warnings:

  - You are about to drop the `symbol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `symbol`;

-- CreateTable
CREATE TABLE `stock_meta` (
    `ticker` VARCHAR(5) NOT NULL,
    `exchange` VARCHAR(8) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` ENUM('ad', 'cs', 'et', 'ps', 'rt', 'struct', 'ut', 'wt') NOT NULL,

    INDEX `stock_meta_name_index`(`name`),
    PRIMARY KEY (`ticker`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
