/*
  Warnings:

  - You are about to drop the column `symbol` on the `Trade` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Trade_userId_symbol_key";

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "symbol",
ADD COLUMN     "brokerId" TEXT,
ADD COLUMN     "brokerage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "symbolId" TEXT;

-- CreateTable
CREATE TABLE "Broker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symbol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Broker_userId_idx" ON "Broker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Broker_name_userId_key" ON "Broker"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_userId_name_key" ON "Symbol"("userId", "name");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Broker" ADD CONSTRAINT "Broker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
