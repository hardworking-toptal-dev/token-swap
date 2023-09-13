import { Alert } from "react-bootstrap";
import styled from "styled-components";
import Banner from "../components/Banner";
import { Footer } from "../components/Footer";

export function ErrorPage() {
  return (
    <Wrapper>
      <BannerWrapper>
        <Banner />
      </BannerWrapper>
      <StyledAlert variant="danger">
        <Alert.Heading>
          Oh snap! It looks like this page isn't loading correctly!
        </Alert.Heading>
        <p>
          This page probably doesn't exist. If it does exist and isn't loading
          correctly, send an email <a href="mailto:contact@chatswap.ai">here</a>
          .
        </p>
      </StyledAlert>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledAlert = styled(Alert)`
  width: 70%;
`;

const BannerWrapper = styled.div`
  width: 100%;
`;
