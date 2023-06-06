import styled from "styled-components";
import TradingBox from "./components/TradingBox";
import ChatBox from "./components/ChatBox";
import { BANNER_COLOR, MAIN_TEXT_COLOR } from "./colors";

export function Landing() {
  return (
    <Wrapper>
      <Banner>
        <h2>CHATSWAP</h2>
      </Banner>
      <ChatAndContentWrapper>
        <ContentWrapper>
          <LandingTradingBox />
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
  height: 100%;
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
  height: 100%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const LandingTradingBox = styled(TradingBox)`
  margin-left: 20%;
  margin-bottom: 15%;
`;
