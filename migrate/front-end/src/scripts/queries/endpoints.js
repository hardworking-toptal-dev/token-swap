import { PrismaClient } from "@prisma/client";
import express from "express";

const port = 4500;
const api = express();
const prisma = new PrismaClient();

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
api.get("/users/:address", async (req, res) => {
  const { address } = req.params;
  const users = await prisma.user.findUnique({ where: { address: address } });
  res.json(users);
});

//server
const server = api.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
