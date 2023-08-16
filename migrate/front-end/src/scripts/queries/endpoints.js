import { PrismaClient } from "@prisma/client";
import express from "express";
import io from "socket.io-client";
import { getTransaction } from "../web3/backend_web3.js";

const port = 4500;
const api = express();
const prisma = new PrismaClient();
const socket = io("http://localhost:4000");

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

//endpoints
api.get("/users/:address/:signature", async (req, res) => {
  const { address, signature } = req.params;
  const users = await prisma.user.findUnique({
    where: { address: address, signature: signature },
  });
  console.log(users, signature);
  res.json(users);
});

api.post("/createUser/:address/:username/:signature", async (req, res) => {
  //Need to implement check that uses getAddressFromSignature to ensure that both the address and the string are real address and string values to prevent spamming of post requests by malicious users
  const { address, username, signature } = req.params;

  const response = await prisma.user.create({
    data: { address: address, username: username, signature: signature },
  });
  res.json(response);
});

api.post("/sendTransaction/:signature/:transactionId/", async (req, res) => {
  const { signature, transactionId } = req.params;
  const transaction = await getTransaction(transactionId);
  const user = await prisma.user.findUnique({
    where: { address: transaction.address, signature: signature },
  });
  const isRecent = Date.now() - transaction.blocktime <= 600000; //Transaction has to be within 10 minutes

  if (user) {
    socket.emit("broadcast", {
      sender: "transaction_client",
      msg: { ...transaction, username: user.username },
    });
  }
});

//server
const server = api.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
