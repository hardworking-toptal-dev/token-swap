import styled from "styled-components";
import { INPUT_COLOR, MAIN_COMPONENT_COLOR } from "../colors";
import { Form, InputGroup } from "react-bootstrap";

export default function ChatBox() {
  return (
    <Wrapper className="rounded-3">
      <InputGroup>
        <User>Nano1778</User>
        <ChatInput></ChatInput>
      </InputGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 40vh;
  width: 55vw;
  margin-top: 10px;
  background-color: ${MAIN_COMPONENT_COLOR};
  display: flex;
  flex-direction: column-reverse;
  padding: 5px;
`;
const User = styled(InputGroup.Text)`
  background-color: ${INPUT_COLOR};
`;
const ChatInput = styled(Form.Control)`
  background-color: ${INPUT_COLOR};
`;
