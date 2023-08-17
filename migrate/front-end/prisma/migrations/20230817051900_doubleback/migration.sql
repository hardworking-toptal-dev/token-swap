/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Token` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "chainId" INTEGER NOT NULL,
    "decimals" INTEGER NOT NULL,
    "logoURI" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL
);
INSERT INTO "new_Token" ("address", "chainId", "decimals", "logoURI", "name", "symbol") SELECT "address", "chainId", "decimals", "logoURI", "name", "symbol" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
