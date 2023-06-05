import styled from "styled-components";
import { INPUT_COLOR } from "../colors";
import MainButton from "./Button";
import { Form, InputGroup } from "react-bootstrap";

export default function SwapBox(props: { buttonText: string }) {
  return (
    <InputWrapper className="mb-3" size="sm" borderRadius="30px">
      <MainButton className="" width="30%" text={props.buttonText}></MainButton>
      <SwapForm width={"90px"} />
    </InputWrapper>
  );
}

const InputWrapper = styled(InputGroup)`
  width: 90%;
`;

const SwapForm = styled(Form.Control)`
  background-color: ${INPUT_COLOR};
  border-color: ${INPUT_COLOR};
`;
