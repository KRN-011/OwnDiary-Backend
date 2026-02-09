/*
  Warnings:

  - Changed the type of `day` on the `Trade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MON', 'TUES', 'WEDNES', 'THURS', 'FRI', 'SATUR', 'SUN');

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "day",
ADD COLUMN     "day" "Days" NOT NULL;
