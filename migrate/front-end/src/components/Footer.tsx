import styled from "styled-components";
import { INPUT_COLOR, MAIN_COLOR } from "../constants/colors";
import { useNavigate } from "react-router-dom";
import { CONTACT_EMAIL } from "../constants/contact_email";

export function Footer(props: { className?: string }) {
  const navigate = useNavigate();

  return (
    <FooterWrapper className={props.className}>
      <ItemsWrapper>
        <FooterItem onClick={() => navigate("/")}>Home</FooterItem>
        <FooterItem onClick={() => navigate("/faq")}>FAQ</FooterItem>
        <FooterItem href={`mailto:${CONTACT_EMAIL}`}>Contact</FooterItem>
      </ItemsWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const FooterItem = styled.a`
  margin-left: 5px;
  margin-right: 5px;
  font-weight: bold;
  color: ${INPUT_COLOR};
  text-decoration: none;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Test = styled.div``;
