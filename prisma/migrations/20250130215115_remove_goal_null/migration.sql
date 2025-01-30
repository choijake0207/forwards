/*
  Warnings:

  - Made the column `weeklyGoal` on table `Habit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Habit` MODIFY `weeklyGoal` INTEGER NOT NULL;
