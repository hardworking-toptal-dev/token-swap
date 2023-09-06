import styled from "styled-components";
import ChatBox from "../components/ChatBox";
import Banner from "../components/Banner";

export function Faq() {
  return (
    <Wrapper>
      <Banner />
      <ChatAndContentWrapper>
        <ChatBox />
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
