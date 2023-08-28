import { Web3 } from "web3";
import { ethers } from "ethers";
import { ERC20ABI, ZeroXABI } from "../../constants/ABI.js";
import { ETH_ADDRESS, INFURA_API_ADDRESS } from "../../constants/API.js";
import { signature_message } from "../../constants/signature_message.js";
import { arrayBuffer } from "node:stream/consumers";

const web3 = new Web3(INFURA_API_ADDRESS);

export async function getTransaction(transactionId) {
  try {
    const transaction = await web3.eth.getTransaction(transactionId);
    console.log(transaction.from);
    const inter = new ethers.Interface(ZeroXABI);
    const decodedInput = inter.parseTransaction({ data: transaction.input });
    const blockTimeUnix =
      parseInt((await web3.eth.getBlock(transaction.blockNumber)).timestamp) *
      1000;
    const tokenAddresses =
      decodedInput.args[0].length > 2 &&
      typeof decodedInput.args[0] === "object"
        ? [decodedInput.args[0][1], decodedInput.args[0][0]]
        : decodedInput.args[0][1].length > 1
        ? [decodedInput.args[0][0], decodedInput.args[0][1]]
        : [decodedInput.args[1], decodedInput.args[0]];

    const buyTokenContract = new web3.eth.Contract(
      ERC20ABI,
      // decodedInput.args[0][1].length > 1
      //   ? decodedInput.args[0][1]
      //   : decodedInput.args[1]
      tokenAddresses[1]
    );

    const decimals =
      tokenAddresses[1] !== ETH_ADDRESS
        ? parseInt(await buyTokenContract.methods.decimals().call())
        : 18;

    const amount =
      decodedInput.args[0].length > 2 &&
      typeof decodedInput.args[0] === "object"
        ? (parseFloat(decodedInput.args[0][2]) / 10 ** decimals).toPrecision(5)
        : (parseFloat(decodedInput.args[2]) / 10 ** decimals).toPrecision(5);

    return {
      address: transaction.from,
      blocktime: blockTimeUnix,
      tokenAddresses:
        // typeof decodedInput.args[0] === "string"
        //   ? [decodedInput.args[0], decodedInput.args[1]]
        //   : decodedInput.args[0],
        tokenAddresses,
      // eslint-disable-next-line no-undef
      buyTokenAmount: amount,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getAddressFromSignature(signature) {
  return await web3.eth.personal.ecRecover(signature_message, signature);
}
