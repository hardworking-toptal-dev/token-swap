//This script only allows for connection to the server and chatting within the terminal
//using `node client.js`. Is only used for testing.

import io from "socket.io-client";
import { createInterface } from "readline";
import prompt from "prompt-sync";

const socket = io("http://localhost:4000");
const input = prompt({ sigint: true });
const nickname = input("Username: ");

console.log("Connecting to the server...");
socket.on("connect", () => {
  console.log(`[INFO]: Welcome ${nickname}`);
});
socket.on("disconnect", (reason) => {
  console.log("[INFO]: Client disconnected, reason: %s", reason);
});

const rl = createInterface({
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
