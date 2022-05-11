/*
  Warnings:

  - The primary key for the `user_auth_id` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `user_auth_id` DROP PRIMARY KEY,
    MODIFY `auth_id` VARCHAR(128) NOT NULL,
    ADD PRIMARY KEY (`auth_id`, `auth_type`);
