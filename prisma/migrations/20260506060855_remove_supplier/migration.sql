/*
  Warnings:

  - You are about to drop the column `id_supplier` on the `motors` table. All the data in the column will be lost.
  - You are about to drop the `suppliers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `motors` DROP FOREIGN KEY `motors_id_supplier_fkey`;

-- DropIndex
DROP INDEX `motors_id_supplier_fkey` ON `motors`;

-- AlterTable
ALTER TABLE `motors` DROP COLUMN `id_supplier`;

-- DropTable
DROP TABLE `suppliers`;
