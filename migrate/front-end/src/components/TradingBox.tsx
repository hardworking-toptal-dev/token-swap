import styled from "styled-components";
import {
  INPUT_COLOR,
  MAIN_COMPONENT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import SwapBox from "./SwapBox";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import { token } from "../constants/types";
import {
  TokenTypes,
  getPrice,
  approve,
  getAllowance,
  isConnected,
  swap,
  getTransaction,
} from "../scripts/web3/swap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faRightLeft } from "@fortawesome/free-solid-svg-icons";

const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

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
  const ethereumToken: token = {
    address: ETH_ADDRESS,
    chainId: 1,
    decimals: 18,
    extensions: undefined,
    logoURI: "",
    name: "Ethereum",
    symbol: "ETH",
  };

  const [tokens, setTokens] = useState([] as token[]);
  const [buyToken, setBuyToken] = useState(ethereumToken);
  const [sellToken, setSellToken] = useState(nullToken);
  const [buyTokenText, setBuyTokenText] = useState("SELECT TOKEN");
  const [sellTokenText, setSellTokenText] = useState("SELECT TOKEN");
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  const [sellTokenAmount, setSellTokenAmount] = useState(0);
  const [buyTokenPrice, setBuyTokenPrice] = useState(0);
  const [sellTokenPrice, setSellTokenPrice] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);

  getTransaction(); //testing

  useEffect(() => {
    fetch(props.tokenListURL)
      .then((result) => result.json())
      .then((data: { tokens: token[] }) => {
        const tokensData = data.tokens.filter((token) => {
          return token.chainId === 1;
        });
        tokensData.push(ethereumToken);
        setTokens(tokensData);
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
      else if (!buyTokenAmount && !sellTokenAmount) setGasPrice(0);
    }
    parsePromise();
  }, [
    buyToken.address,
    buyToken.decimals,
    buyTokenAmount,
    sellToken.address,
    sellToken.decimals,
    sellTokenAmount,
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
      else if (!buyTokenAmount && !sellTokenAmount) setGasPrice(0);
    }
    parsePromise();
  }, [
    buyToken.address,
    buyToken.decimals,
    buyTokenAmount,
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
        <MainButton
          onClick={() => {
            if (
              buyToken.address !== nullToken.address &&
              sellToken.address !== nullToken.address
            ) {
              const ogBuyToken = buyToken;
              setBuyToken(sellToken);
              setSellToken(ogBuyToken);
            }
          }}
        >
          <SwapIcon icon={faRightLeft} rotation={90} />
        </MainButton>
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
          {/* <GasText>GAS</GasText>
           */}
          <FontAwesomeIcon icon={faGasPump} />
          <GasText style={{ color: MAIN_TEXT_COLOR }}>{gasPrice}</GasText>
        </Gas>
      </GasWrapper>
      <SwapWrapper>
        <SwapButton
          buyTokenAddress={buyToken.address}
          buyAmount={buyTokenAmount ? buyTokenAmount : buyTokenPrice}
          sellTokenAddress={sellToken.address}
          // sellAmount={sellTokenAmount ? sellTokenAmount : sellTokenPrice}
          buyDecimals={buyToken.decimals}
        />
      </SwapWrapper>
    </Wrapper>
  );
}

function SwapButton(props: {
  buyTokenAddress: string;
  sellTokenAddress: string;
  // sellAmount: number;
  buyDecimals: number;
  buyAmount: number;
}) {
  const [buttonText, setButtonText] = useState("SWAP");
  const [disabled, setDisabled] = useState(true);

  const approveOnClick = () => {
    approve(props.buyTokenAddress);
  };
  const swapOnClick = () => {
    swap(
      props.buyTokenAddress,
      props.sellTokenAddress,
      props.buyAmount,
      props.buyDecimals
    );
  };

  const [onClick, setOnClick] = useState({ function: approveOnClick });

  useEffect(() => {
    (async () => {
      if (props.buyTokenAddress && props.buyTokenAddress !== ETH_ADDRESS) {
        const allowance = await getAllowance(props.buyTokenAddress);
        if ((allowance as number) < props.buyAmount) {
          setButtonText("APPROVE");
          setOnClick({ function: approveOnClick });
          setDisabled(false);
        } else {
          setButtonText("SWAP");
          if (!props.buyAmount || !(await isConnected())) {
            setDisabled(true);
          } else setDisabled(false);
          setOnClick({ function: swapOnClick });
        }
      } else if (
        props.buyTokenAddress === ETH_ADDRESS &&
        props.buyAmount &&
        (await isConnected())
      ) {
        setDisabled(false);
        setButtonText("SWAP");
        setOnClick({ function: swapOnClick });
      }
    })();
  }, [props.buyAmount, props.buyTokenAddress]);

  return (
    <>
      <MainButton
        text={buttonText}
        width={"30%"}
        onClick={onClick.function}
        disabled={disabled}
      />
    </>
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
`;
const Gas = styled.span`
  width: 30%;
  height: 100%;
  background-color: ${INPUT_COLOR};
  margin-right: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SwapIcon = styled(FontAwesomeIcon)`
  /* color: ${MAIN_TEXT_COLOR}; */
  width: 30px;
  height: 30px;
  margin-top: 10%;
`;
