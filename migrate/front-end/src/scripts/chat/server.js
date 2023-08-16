import { RateLimiterMemory } from "rate-limiter-flexible";
import { Server } from "socket.io";

const port = 4000;
const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});
console.log("Server is listening on port: %d", port);

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 points
  duration: 1, // per second
});

io.of("/").on("connect", (socket) => {
  console.log("\nA client connected");
  console.log("Number of clients: %d", io.of("/").server.engine.clientsCount);
  socket.on("data", async (data) => {
    try {
      await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      console.log(`data received is '${data.Message}'`); //Can be used to receive data to use to query db to authenticate users
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("\nA client disconnected, reason: %s", reason);
    console.log("Number of clients: %d", io.of("/").server.engine.clientsCount);
  });
});

io.of("/").on("connect", (socket) => {
  socket.on("broadcast", async (data) => {
    try {
      await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      console.log("\n%s", data);
      socket.broadcast.emit("broadcast", data);
    } catch (e) {
      console.log(e);
    }
  });
});
