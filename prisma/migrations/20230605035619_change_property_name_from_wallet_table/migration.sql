/*
  Warnings:

  - You are about to drop the column `initial_balance` on the `wallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "initial_balance",
ADD COLUMN     "balance" DECIMAL(65,30) DEFAULT 0;
