import styled from "styled-components";
import ChatBox from "../components/ChatBox";
import Banner from "../components/Banner";
import { Footer } from "../components/Footer";

export function PageTemplate(props: { children: JSX.Element }) {
  return (
    <Wrapper>
      <Banner />
      <ChatAndContentWrapper>
        <ContentWrapper>{props.children}</ContentWrapper>
        <StyledChatBox />
      </ChatAndContentWrapper>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatAndContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const StyledChatBox = styled(ChatBox)`
  width: 400px;
`;
