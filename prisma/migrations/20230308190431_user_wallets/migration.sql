/*
  Warnings:

  - A unique constraint covering the columns `[holaplexCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "holaplexCustomerId" UUID;

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "holaplexCustomerId" UUID NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_holaplexCustomerId_key" ON "User"("holaplexCustomerId");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_holaplexCustomerId_fkey" FOREIGN KEY ("holaplexCustomerId") REFERENCES "User"("holaplexCustomerId") ON DELETE CASCADE ON UPDATE CASCADE;
