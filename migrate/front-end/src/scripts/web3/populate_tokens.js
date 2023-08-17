import { PrismaClient } from "@prisma/client";
import { ETH_ADDRESS, TOKEN_LIST_URL } from "../../constants/API.js";

const ethereumToken = {
  address: ETH_ADDRESS,
  chainId: 1,
  decimals: 18,
  extensions: undefined,
  logoURI: "",
  name: "Ethereum",
  symbol: "ETH",
};

const prisma = new PrismaClient();

(async () => {
  const tokens = await fetch(TOKEN_LIST_URL)
    .then((result) => result.json())
    .then((data) => {
      const tokensData = data.tokens.filter((token) => {
        return token.chainId === 1;
      });
      tokensData.push(ethereumToken);
      return tokensData;
    });

  await prisma.token.deleteMany({});

  tokens.forEach(async (token) => {
    await prisma.token.create({
      data: {
        address: token.address.toLowerCase(),
        chainId: token.chainId,
        decimals: token.decimals,
        logoURI: token.logoURI,
        name: token.name,
        symbol: token.symbol,
      },
    });
  });
})();
