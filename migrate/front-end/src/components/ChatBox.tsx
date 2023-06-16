import styled from "styled-components";
import { INPUT_COLOR, MAIN_COMPONENT_COLOR } from "../colors";
import { Form, InputGroup } from "react-bootstrap";
import MainButton from "./MainButton";

export default function ChatBox() {
  return (
    <Wrapper className="rounded-3">
      <InputGroup>
        <ChatInput></ChatInput>
        <MainButton
          onClick={() => null}
          className=""
          width=""
          text="Enter"
        ></MainButton>
      </InputGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 95vh;
  width: 25vw;
  margin-top: 10px;
  background-color: ${MAIN_COMPONENT_COLOR};
  display: flex;
  flex-direction: column-reverse;
  padding: 5px;
`;
const ChatInput = styled(Form.Control)`
  background-color: ${INPUT_COLOR};
`;
