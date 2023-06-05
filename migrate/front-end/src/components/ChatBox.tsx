import styled from "styled-components";
import { MAIN_COMPONENT_COLOR } from "../colors";

export default function ChatBox() {
  return <Wrapper />;
}

const Wrapper = styled.div`
  border-radius: 25px;
  height: 40vh;
  width: 55vw;
  margin-top: 10px;
  background-color: ${MAIN_COMPONENT_COLOR};
`;
