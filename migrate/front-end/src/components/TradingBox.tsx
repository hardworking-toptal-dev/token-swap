import styled from "styled-components";
import { INPUT_COLOR, MAIN_COMPONENT_COLOR, MAIN_TEXT_COLOR } from "../colors";
import SwapBox from "./SwapBox";
import Button from "./Button";

export default function TradingBox() {
  return (
    <Wrapper>
      <SwapBoxes>
        <SwapBox buttonText="BUY TOKEN" />
        <SwapBox buttonText="SELL TOKEN" />
      </SwapBoxes>
      <GasWrapper>
        <Gas>
          <p>GAS</p>
          <p style={{ color: MAIN_TEXT_COLOR }}>1000</p>
        </Gas>
      </GasWrapper>
      <SwapWrapper>
        <Button width="30%" height="30%" text="SWAP" />
      </SwapWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 25px;
  width: 30vw;
  height: 22vw;
  background-color: ${MAIN_COMPONENT_COLOR};
  display: flex;
  flex-direction: column;
`;
const SwapBoxes = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
const SwapWrapper = styled.div`
  height: 30%;
  align-items: center;
  display: flex;
  justify-content: space-around;
`;
