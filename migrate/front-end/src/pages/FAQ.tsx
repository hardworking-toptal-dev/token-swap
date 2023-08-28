import styled from "styled-components";
import TradingBox from "../components/TradingBox";
import ChatBox from "../components/ChatBox";
import TrendsTable from "../components/TrendsTable";
import Banner from "../components/Banner";
import { useState } from "react";
import type { User } from "@prisma/client";

export function Faq() {
  const [user, setUser] = useState({} as User); //for testing chatserver

  return (
    <Wrapper>
      <Banner setUser={setUser} />
      <ChatAndContentWrapper>
        <ChatBox user={user} />
        <p>Test FAQ</p>
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
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
