-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "decimals" INTEGER NOT NULL,
    "logoURI" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");
