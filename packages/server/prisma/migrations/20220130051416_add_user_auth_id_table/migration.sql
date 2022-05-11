-- CreateTable
CREATE TABLE `user_auth_id` (
    `auth_id` INTEGER NOT NULL,
    `auth_type` ENUM('google', 'kakao', 'naver') NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`auth_id`, `auth_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_auth_id` ADD CONSTRAINT `fk_user_auth_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
