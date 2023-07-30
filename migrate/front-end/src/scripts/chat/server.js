const port = 4000;
const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});
console.log("Server is listening on port: %d", port);

io.of("/").on("connect", (socket) => {
  console.log("\nA client connected");

  socket.on("disconnect", (reason) => {
    console.log("\nA client disconnected, reason: %s", reason);
    console.log("Number of clients: %d", io.of("/").server.engine.clientsCount);
  });
});

io.of("/").on("connect", (socket) => {
  //...
  socket.on("broadcast", (data) => {
    console.log("\n%s", data);
    socket.broadcast.emit("broadcast", data);
  });
});
