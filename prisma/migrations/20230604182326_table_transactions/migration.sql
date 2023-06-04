/*
  Warnings:

  - You are about to alter the column `name` on the `airline_clubs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `name` on the `bank_clubs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `name` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.

*/
-- AlterTable
ALTER TABLE "airline_clubs" ALTER COLUMN "name" SET DATA TYPE VARCHAR(80);

-- AlterTable
ALTER TABLE "bank_clubs" ALTER COLUMN "name" SET DATA TYPE VARCHAR(80);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "wallets" ALTER COLUMN "name" SET DATA TYPE VARCHAR(80);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255),
    "amount_origin" DECIMAL(65,30) NOT NULL,
    "amount_destination" DECIMAL(65,30) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "wallet_origin_id" TEXT NOT NULL,
    "wallet_destination_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_origin_id_fkey" FOREIGN KEY ("wallet_origin_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_destination_id_fkey" FOREIGN KEY ("wallet_destination_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
