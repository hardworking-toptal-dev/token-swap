import styled from "styled-components";
import { INPUT_COLOR } from "../colors";
import MainButton from "./Button";
import { Form, InputGroup } from "react-bootstrap";
import { token } from "../types";
import TokenModal from "./TokenModal";
import { useEffect, useState } from "react";

export default function SwapBox(props: {
  buttonText: string;
  tokens: token[];
  setSelectedToken: Function;
}) {
  const [modalShown, setModalShown] = useState({ show: false });
  function onClick() {
    setModalShown({ show: true });
  }
  console.log(modalShown);
  return (
    <InputWrapper className="mb-3" size="sm" borderRadius="30px">
      <TokenModal
        setSelectedToken={props.setSelectedToken}
        shown={modalShown}
        tokens={props.tokens}
      />
      <MainButton
        onClick={onClick}
        className=""
        width="30%"
        text={props.buttonText}
      ></MainButton>
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
  form {
    overflow: hidden;
  }
  input {
    float: right;
    clear: both;
  }
`;
