import { Web3 } from "web3";
import { ethers } from "ethers";
import { ZeroXABI } from "../../constants/ABI.js";
import { INFURA_API_ADDRESS } from "../../constants/API.js";
import { signature_message } from "../../constants/signature_message.js";

const web3 = new Web3(INFURA_API_ADDRESS);

export async function getTransaction(transactionId) {
  const transaction = await web3.eth.getTransaction(transactionId);
  const inter = new ethers.Interface(ZeroXABI);
  const decodedInput = inter.parseTransaction({ data: transaction.input });
  const blockTimeUnix =
    parseInt((await web3.eth.getBlock(transaction.blockNumber)).timestamp) *
    1000;
  const blockTime = new Date(blockTimeUnix);

  console.log(transaction.from); //To get address of who made the swap
  console.log(decodedInput?.args); //To get contract addresses and amounts of tokens swapped
  console.log(blockTime); //To get time that the transaction was completed.

  return {
    address: transaction.from,
    blocktime: blockTimeUnix,
    tokenAddresses: decodedInput.args[0],
    sellTokenAmount: parseInt(decodedInput.args[1]),
    buyTokenAmount: parseInt(decodedInput.args[2]),
  };
}

export async function getAddressFromSignature(signature) {
  return await web3.eth.personal.ecRecover(signature_message, signature);
}
