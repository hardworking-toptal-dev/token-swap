-- CreateTable
CREATE TABLE "Token" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "chainId" INTEGER NOT NULL,
    "decimals" INTEGER NOT NULL,
    "logoURI" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");
