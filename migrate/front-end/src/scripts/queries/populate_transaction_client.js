import { PrismaClient } from "@prisma/client";
import { TRANSACTION_CLIENT_SIGNATURE } from "../../constants/sensitive.js";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.user.delete({
      where: {
        address: "transaction_client",
        administrative: true,
      },
    });
  } catch (e) {
    console.log(e);
  }

  await prisma.user.create({
    data: {
      address: "transaction_client",
      signature: TRANSACTION_CLIENT_SIGNATURE,
      username: "transaction_client",
      administrative: true,
    },
  });
})();
