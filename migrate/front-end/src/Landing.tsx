import styled from "styled-components";
import TradingBox from "./components/TradingBox";
import ChatBox from "./components/ChatBox";
import { MAIN_TEXT_COLOR } from "./colors";

export function Landing() {
  return (
    <Wrapper>
      <Title>CHATSWAP</Title>
      <TradingBox />
      <ChatBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
`;
const Title = styled.h1`
  font-weight: bolder;
  color: ${MAIN_TEXT_COLOR};
  font-size: 40px;
`;
