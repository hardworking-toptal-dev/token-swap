import MetaMaskSDK from "@metamask/sdk";
import { API_KEY } from "../constants/0x_api_key";
import "@openzeppelin/contracts/token/ERC20/";

export enum TokenTypes {
  buy = "buy",
  sell = "sell",
}

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();

export async function getAccount() {
  return ethereum
    ?.request({ method: "eth_requestAccounts", params: [] })
    .then((response) => response);
}

export async function isConnected() {
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
    let url = "https://api.0x.org/swap/v1/price/";
    const params =
      "buyToken=" + buyToken + "&sellToken=" + sellToken + "&" + buyOrSell;
    const headers = { "0x-api-key": API_KEY };

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
            gasEstimate: responseDict["estimatedGas"],
          };
        });
    }
  }
}

export async function allowanceTest() {
  allowanceTest;
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
