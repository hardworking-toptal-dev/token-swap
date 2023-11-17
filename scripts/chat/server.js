import { PrismaClient } from "@prisma/client";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const expressApp = express();

expressApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = createServer(expressApp);
const port = 4000;
const io = new Server(server, {
  path: "/chat/",
  cors: {
    origin: "http://www.chatswap.ai",
  },
});
const prisma = new PrismaClient();

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 points
  duration: 1, // per second
});

io.of("/").on("connect", (socket) => {
  console.log("\nA client connected");
  console.log("Number of clients: %d", io.of("/").server.engine.clientsCount);
  let transactionClientUser;

  socket.on("data", async (data) => {
    try {
      await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      console.log(`data received is '${data.address}'`); //Can be used to receive data to use to query db to authenticate users
      transactionClientUser = await prisma.user.findUnique({
        where: {
          address: data.address ? data.address : "",
          signature: data.signature ? data.signature : "",
        },
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("\nA client disconnected, reason: %s", reason);
    console.log("Number of clients: %d", io.of("/").server.engine.clientsCount);
  });

  socket.on("broadcast", async (data) => {
    try {
      await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      const authenticated =
        transactionClientUser.address === data.sender &&
        transactionClientUser.signature === data.signature;
      if (transactionClientUser && authenticated)
        socket.broadcast.emit("broadcast", {
          sender: transactionClientUser.username,
          address: transactionClientUser.address,
          action: data.action,
          msg: data.msg,
          key: Math.random(),
        });
    } catch (e) {
      console.log(e);
    }
  });
});

server.listen(port, () =>
  console.log(`Chat server listening on port: ${port}`)
);
