/*
  Warnings:

  - A unique constraint covering the columns `[userId,symbol]` on the table `Trade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trade_userId_symbol_key" ON "Trade"("userId", "symbol");
