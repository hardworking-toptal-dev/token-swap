import MetaMaskSDK from "@metamask/sdk";
import Web3 from "web3";
import { ERC20ABI } from "../../constants/ABI";
import { signature_message } from "../../constants/signature_message";
import { ZEROX_API_KEY } from "../../constants/sensitive";
import { IP_ADDRESS } from "../../constants/ip_address";

export enum TokenTypes {
  buy = "buy",
  sell = "sell",
}

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();
const web3 = new Web3(ethereum);
const ZeroXSpenderAddress = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

export async function getAccount() {
  return ethereum
    ?.request({ method: "eth_requestAccounts", params: [] })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function isConnected() {
  try {
    const possibleAccounts = await ethereum
      ?.request({ method: "eth_accounts" })
      .then((accounts) => {
        return accounts;
      });
    if ((possibleAccounts as string[])[0]) {
      return await getAccount().then((accounts) => {
        return accounts as string[];
      });
      // getUsername();
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPrice(
  buyOrSell: TokenTypes,
  buyToken: string,
  sellToken: string,
  sellDecimals: number,
  buyDecimals: number,
  amount: number
) {
  if (buyToken && sellToken) {
    const url = "https://api.0x.org/swap/v1/price/";
    const params =
      "buyToken=" + buyToken + "&sellToken=" + sellToken + "&" + buyOrSell;
    const headers = { "0x-api-key": ZEROX_API_KEY };

    if (buyOrSell === TokenTypes.sell) {
      return fetch(
        url +
          "?" +
          params +
          "Amount=" +
          ensureNotation(amount * 10 ** sellDecimals),
        { headers }
      )
        .then((result) => {
          return result.json();
        })
        .then((responseDict: any) => {
          return {
            price: responseDict["price"] * amount,
            gasEstimate: responseDict["estimatedGas"],
          };
        });
    }
    if (buyOrSell === TokenTypes.buy) {
      return fetch(
        url +
          "?" +
          params +
          "Amount=" +
          ensureNotation(amount * 10 ** buyDecimals),
        { headers }
      )
        .then((result) => {
          return result.json();
        })
        .then((responseDict: any) => {
          return {
            price: responseDict["price"] * amount,
            gasEstimate: responseDict["gas"],
          };
        });
    }
  }
}

export async function swap(
  buyToken: string,
  sellToken: string,
  buyAmount: number,
  buyDecimals: number
) {
  const url = "https://api.0x.org/swap/v1/quote/";
  const params =
    "buyToken=" +
    sellToken +
    "&sellToken=" +
    buyToken +
    "&sellAmount=" +
    ensureNotation(buyAmount * 10 ** buyDecimals) +
    "&takerAddress=" +
    ((await getAccount()) as string[])[0];
  const headers = { "0x-api-key": ZEROX_API_KEY };

  const quote = await fetch(url + "?" + params, { headers }).then((result) => {
    return result.json();
  });
  console.log(quote);

  const receipt = await web3.eth.sendTransaction(quote);

  console.log(receipt);
  const signature = await getSignature(((await getAccount()) as string[])[0]);
  try {
    fetch(
      `http://${IP_ADDRESS}:4500/sendTransaction/${signature}/${receipt.transactionHash}`,
      { method: "POST" }
    );
  } catch (e) {
    console.log(e);
  }
}

export async function approve(buyTokenAddress: string) {
  if (await isConnected()) {
    const address = ((await getAccount()) as string[])[0];
    const Contract = new web3.eth.Contract(ERC20ABI, buyTokenAddress);
    Contract.methods
      // @ts-ignore
      .approve(ZeroXSpenderAddress, "1")
      .send({
        from: address,
      });
  }
}

export async function getAllowance(buyTokenAddress: string) {
  if (await isConnected()) {
    const address = ((await getAccount()) as string[])[0];
    const Contract = new web3.eth.Contract(ERC20ABI, buyTokenAddress);

    return parseInt(
      await Contract.methods
        // @ts-ignore
        .allowance(address, ZeroXSpenderAddress)
        .call({ from: address })
    );
  }
}

export async function getSignature(address: string) {
  const signatureCookie = getCookie("signature");

  if (!signatureCookie) {
    const signature = await web3.eth.personal.sign(
      signature_message,
      address,
      "none"
    );
    document.cookie = `signature=${signature}`;
    return signature;
  }
  return signatureCookie;
}

export async function forceSignature(address: string) {
  const signature = await web3.eth.personal.sign(
    signature_message,
    address,
    "none"
  );
  document.cookie = `signature=${signature}`;
  return signature;
}

export function getCookie(c_name: string) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

function ensureNotation(number: Number) {
  let s = "";
  const numberString = number.toString();
  let scientificNotationFlag = false;
  let digits = 0;

  for (let i = 0; i <= numberString.length; i++) {
    let digitString = "";

    if (numberString.charAt(i) === "e") {
      //Iterates through number to see if it is in scientific notation, if so records the exponent.
      scientificNotationFlag = true;
      for (let j = i + 2; j <= numberString.length; j++) {
        digitString += numberString.charAt(j);
      }
      digits = parseInt(digitString);
      s = "";
      break;
    }
  }
  if (!scientificNotationFlag) {
    //If not in scientific notation, just returns the number normally.
    s = numberString;
    return s;
  }

  let decimalFlag = false;
  let decimalCount = 0;
  for (let i = 0; i <= numberString.length; i++) {
    //Iterates through number in scientific notation and records all digits until the "e" is reached.
    if (numberString.charAt(i) === "e") {
      break;
    }
    if (decimalFlag) {
      decimalCount++;
    }
    if (numberString.charAt(i) !== ".") {
      s += numberString.charAt(i);
    } else if (numberString.charAt(i) === ".") {
      decimalFlag = true;
    }
  }

  for (let i = decimalCount; i <= digits - 1; i++) {
    //Appends 0s to the end of the number recorded above based on how many digits were recorded above - the amount of digits counted after the decimal was reached.
    s += "0";
  }

  return s;
}
