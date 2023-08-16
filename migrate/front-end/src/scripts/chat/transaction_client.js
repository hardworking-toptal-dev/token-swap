// import express from "express";
// import io from "socket.io-client";

import { getTransaction } from "../web3/backend_web3.js";

// const port = 3500;
// const api = express();
// const socket = io("http://localhost:4000");

// //configuration
// api.use(express.json());

// api.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// //server
// const server = api.listen(port, () => {
//   console.log(`Server listening at port ${port}`);
// });

getTransaction();
