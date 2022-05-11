-- CreateTable
CREATE TABLE `symbol` (
    `ticker` VARCHAR(5) NOT NULL,
    `exchange` VARCHAR(8) NOT NULL,
    `name` TEXT NOT NULL,
    `type` VARCHAR(6) NOT NULL,

    PRIMARY KEY (`ticker`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
