/*
  Warnings:

  - You are about to drop the column `status` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `weeklyGoal` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Habit` DROP COLUMN `status`,
    DROP COLUMN `weeklyGoal`;
