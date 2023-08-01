import styled from "styled-components";
import TradingBox from "../components/TradingBox";
import ChatBox from "../components/ChatBox";
import TrendsTable from "../components/TrendsTable";
import Banner from "../components/Banner";
import { useState } from "react";

export function Landing() {
  const [address, setAddress] = useState("undefined"); //for testing chatserver

  return (
    <Wrapper>
      <Banner setAddress={setAddress} />
      <ChatAndContentWrapper>
        <ContentWrapper>
          <LandingTradingBox tokenListURL="https://static.optimism.io/optimism.tokenlist.json" />
          <TrendsTable width="50vw" height="40vh" />
        </ContentWrapper>
        <ChatBox username={address} />
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
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 3%;
`;
const LandingTradingBox = styled(TradingBox)`
  margin-top: 3%;
  margin-bottom: 2%;
`;
