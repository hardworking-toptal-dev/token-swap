import styled from "styled-components";
import TradingBox from "./components/TradingBox";
import ChatBox from "./components/ChatBox";
import { BANNER_COLOR, MAIN_TEXT_COLOR } from "./colors";
import Example from "./components/TrendsTable";

export function Landing() {
  return (
    <Wrapper>
      <Banner>
        <h2>CHATSWAP</h2>
      </Banner>
      <ChatAndContentWrapper>
        <ContentWrapper>
          <LandingTradingBox tokenListURL="https://tokens.coingecko.com/uniswap/all.json" />
          <Example />
        </ContentWrapper>
        <ChatBox />
      </ChatAndContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChatAndContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Banner = styled.div`
  font-weight: bolder;
  color: ${MAIN_TEXT_COLOR};
  font-size: 30px;
  position: absolute;
  background-color: ${BANNER_COLOR};
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-left: 1%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  /* background-color: black; */
  margin-top: 3%;
`;
const LandingTradingBox = styled(TradingBox)`
  margin-top: 3%;
  margin-bottom: 2%;
`;
