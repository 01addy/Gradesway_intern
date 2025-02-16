/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_teacherId_fkey`;

-- DropIndex
DROP INDEX `Quiz_teacherId_fkey` ON `Quiz`;

-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `teacherId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Teacher`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
