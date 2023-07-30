const io = require("socket.io-client");
const socket = io("http://localhost:4000");
const prompt = require("prompt-sync")({ sigint: true });
const nickname = prompt("Username: ");

console.log("Connecting to the server...");
socket.on("connect", () => {
  console.log(`[INFO]: Welcome ${nickname}`);
});
socket.on("disconnect", (reason) => {
  console.log("[INFO]: Client disconnected, reason: %s", reason);
});

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  var str = input;
  socket.emit("broadcast", {
    sender: nickname,
    action: "broadcast",
    msg: str,
  });
});

socket.on("broadcast", (data) => {
  console.log("%s: %s", data.sender, data.msg);
});
