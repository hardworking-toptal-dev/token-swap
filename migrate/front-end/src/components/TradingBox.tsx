import styled from "styled-components";
import { INPUT_COLOR, MAIN_COMPONENT_COLOR, MAIN_TEXT_COLOR } from "../colors";
import SwapBox from "./SwapBox";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import { token } from "../types";
import { TokenTypes, getPrice } from "../scripts/swap";

export default function TradingBox(props: {
  className?: string;
  tokenListURL: string;
}) {
  const nullToken: token = {
    address: "",
    chainId: 0,
    decimals: 0,
    extensions: undefined,
    logoURI: "",
    name: "",
    symbol: "",
  };

  const [tokens, setTokens] = useState([] as token[]);
  const [buyToken, setBuyToken] = useState(nullToken);
  const [sellToken, setSellToken] = useState(nullToken);
  const [buyTokenText, setBuyTokenText] = useState("BUY TOKEN");
  const [sellTokenText, setSellTokenText] = useState("SELL TOKEN");
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  const [sellTokenAmount, setSellTokenAmount] = useState(0);
  const [buyTokenPrice, setBuyTokenPrice] = useState(0);
  const [sellTokenPrice, setSellTokenPrice] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);

  useEffect(() => {
    fetch(props.tokenListURL)
      .then((result) => result.json())
      .then((data: { tokens: token[] }) => {
        setTokens(
          data.tokens.filter((token) => {
            return token.chainId === 1;
          })
        );
      });
  }, [props.tokenListURL]);

  useEffect(() => {
    if (buyToken.symbol) setBuyTokenText(buyToken.symbol);
    if (sellToken.symbol) setSellTokenText(sellToken.symbol);
  }, [buyToken, sellToken]);

  useEffect(() => {
    async function parsePromise() {
      const priceObj = await getPrice(
        TokenTypes.buy,
        buyToken.address,
        sellToken.address,
        sellToken.decimals,
        buyToken.decimals,
        buyTokenAmount
      );
      setSellTokenPrice(priceObj?.price as number);
      if (priceObj?.gasEstimate) setGasPrice(priceObj?.gasEstimate);
      else setGasPrice(0);
    }
    parsePromise();
  }, [
    buyToken.address,
    buyToken.decimals,
    buyTokenAmount,
    sellToken.address,
    sellToken.decimals,
  ]);

  useEffect(() => {
    async function parsePromise() {
      const priceObj = await getPrice(
        TokenTypes.sell,
        buyToken.address,
        sellToken.address,
        sellToken.decimals,
        buyToken.decimals,
        sellTokenAmount
      );
      setBuyTokenPrice(priceObj?.price as number);
      if (priceObj?.gasEstimate) setGasPrice(priceObj?.gasEstimate);
      else setGasPrice(0);
    }
    parsePromise();
  }, [
    buyToken.address,
    buyToken.decimals,
    sellToken.address,
    sellToken.decimals,
    sellTokenAmount,
  ]);

  return (
    <Wrapper className={props.className + " rounded-3"}>
      <SwapBoxes>
        <SwapBox
          setSelectedToken={setBuyToken}
          buttonText={buyTokenText}
          tokens={tokens}
          setTokenAmount={setBuyTokenAmount}
          tokenPrice={buyTokenPrice}
        />
        <SwapBox
          setSelectedToken={setSellToken}
          buttonText={sellTokenText}
          tokens={tokens}
          setTokenAmount={setSellTokenAmount}
          tokenPrice={sellTokenPrice}
        />
      </SwapBoxes>
      <GasWrapper>
        <Gas className="rounded-2">
          <GasText>GAS</GasText>
          <GasText style={{ color: MAIN_TEXT_COLOR }}>{gasPrice}</GasText>
        </Gas>
      </GasWrapper>
      <SwapWrapper>
        <MainButton
          onClick={() => null}
          className="rounded-3"
          width="30%"
          text="SWAP"
        />
      </SwapWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 30vw;
  height: 22vw;
  background-color: ${MAIN_COMPONENT_COLOR};
  display: flex;
  flex-direction: column;
`;
const SwapBoxes = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 5%;
`;
const GasWrapper = styled.div`
  display: flex;
  height: 10%;
  flex-direction: row-reverse;
  background-color: black;
`;
const Gas = styled.span`
  width: 30%;
  height: 100%;
  background-color: ${INPUT_COLOR};
  margin-right: 5%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const GasText = styled.p`
  margin-top: auto;
  margin-bottom: auto;
`;
const SwapWrapper = styled.div`
  height: 30%;
  align-items: center;
  display: flex;
  justify-content: space-around;
`;
