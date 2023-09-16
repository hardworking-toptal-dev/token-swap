import {
  LINK_COLOR,
  MAIN_COLOR,
  MAIN_COMPONENT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function TrendsTable(props: { className?: string }) {
  const navigate = useNavigate();

  return (
    <StyledWrapper className={props.className}>
      <div>
        AI-based trends table coming soon!{" "}
        <Link onClick={() => navigate("/faq")}>Learn more</Link>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${MAIN_COMPONENT_COLOR};
  border-radius: 10px;
  color: ${MAIN_COLOR};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Link = styled.span`
  color: ${LINK_COLOR};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
