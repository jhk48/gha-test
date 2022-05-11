-- AlterTable
ALTER TABLE `symbol` MODIFY `name` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX `symbol_name_index` ON `symbol`(`name`);
