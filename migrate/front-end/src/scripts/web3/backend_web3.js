import { Web3 } from "web3";
import { ethers } from "ethers";
import { ERC20ABI, ZeroXABI } from "../../constants/ABI.js";
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

  const buyTokenContract = new web3.eth.Contract(
    ERC20ABI,
    decodedInput.args[0][1]
  );
  const decimals = parseInt(await buyTokenContract.methods.decimals().call());

  return {
    address: transaction.from,
    blocktime: blockTimeUnix,
    tokenAddresses: decodedInput.args[0],
    // eslint-disable-next-line no-undef
    buyTokenAmount: (
      parseFloat(decodedInput.args[2]) /
      10 ** decimals
    ).toPrecision(5),
  };
}

export async function getAddressFromSignature(signature) {
  return await web3.eth.personal.ecRecover(signature_message, signature);
}
