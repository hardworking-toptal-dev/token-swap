import { PrismaClient } from "@prisma/client";
import express from "express";
import io from "socket.io-client";
import { getTransaction } from "../web3/backend_web3.js";
import { TRANSACTION_CLIENT_SIGNATURE } from "../constants/sensitive.js";
import { RESTRICTED_USERNAMES } from "../constants/restricted_usernames.js";
import { ETH_ADDRESS } from "../constants/ABI.js";
import { CHAT_SERVER_ADDRESS } from "../constants/ip_address.js";

const port = 4500;
const api = express();
const router = express();
const prisma = new PrismaClient();
const socket = io(`http://${CHAT_SERVER_ADDRESS}`);

//configuration

api.use(express.json());

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

api.use("/api", router);

//endpoints
router.get("/users/:address/:signature", async (req, res) => {
  const { address, signature } = req.params;
  const users = await prisma.user.findUnique({
    where: { address: address, signature: signature },
  });
  res.json(users);
});

router.post("/createUser/:address/:username/:signature", async (req, res) => {
  //Need to implement check that uses getAddressFromSignature to ensure that both the address and the string are real address and string values to prevent spamming of post requests by malicious users
  const { address, username, signature } = req.params;

  const response = await prisma.user.create({
    data: { address: address, username: username, signature: signature },
  });
  res.json(response);
});

router.post("/sendTransaction/:signature/:transactionId/", async (req, res) => {
  const { signature, transactionId } = req.params;

  const transaction = await getTransaction(transactionId);
  console.log(transaction);
  if (transaction) {
    const user = await prisma.user.findUnique({
      where: { address: transaction.address, signature: signature },
    });
    const sellToken = await prisma.token.findUnique({
      where: {
        address:
          transaction.tokenAddresses[0] !== ETH_ADDRESS
            ? transaction.tokenAddresses[0].toLowerCase()
            : transaction.tokenAddresses[0],
      },
    });
    const buyToken = await prisma.token.findUnique({
      where: {
        address:
          transaction.tokenAddresses[1] !== ETH_ADDRESS
            ? transaction.tokenAddresses[1].toLowerCase()
            : transaction.tokenAddresses[1],
      },
    });
    const isRecent = Date.now() - transaction.blocktime <= 600000; //Transaction has to be within 10 minutes

    if (user && isRecent) {
      socket.emit("data", {
        sender: "transaction_client",
        address: "transaction_client",
        signature: TRANSACTION_CLIENT_SIGNATURE,
      });
      socket.emit("broadcast", {
        sender: "transaction_client",
        address: "transaction_client",
        signature: TRANSACTION_CLIENT_SIGNATURE,
        msg: {
          ...transaction,
          sellToken: sellToken.symbol
            ? sellToken.symbol
            : transaction.tokenAddresses[0].toLowerCase(),
          buyToken: buyToken.symbol
            ? buyToken.symbol
            : transaction.tokenAddresses[1].toLowerCase(),
          username: user.username,
        },
      });
    }
  }
});

router.get("/tokens", async (req, res) => {
  const tokens = await prisma.token.findMany({});
  res.json(tokens);
});

router.post(
  "/changeUsername/:address/:signature/:newUsername",
  async (req, res) => {
    const { address, signature, newUsername } = req.params;
    const isRestricted = RESTRICTED_USERNAMES.some(
      (username) => newUsername === username
    );
    if (!isRestricted) {
      const user = await prisma.user.update({
        data: { username: newUsername },
        where: { address: address, signature: signature },
      });

      res.json(user);
    }
  }
);

//server
const server = api.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
