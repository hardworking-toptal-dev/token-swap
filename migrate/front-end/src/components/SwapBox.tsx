import styled from "styled-components";
import { INPUT_COLOR } from "../colors";
import MainButton from "./MainButton";
import { Form, InputGroup } from "react-bootstrap";
import { token } from "../types";
import TokenModal from "./TokenModal";
import { BaseSyntheticEvent, useEffect, useState } from "react";

export default function SwapBox(props: {
  buttonText: string;
  tokens: token[];
  setSelectedToken: Function;
  setTokenAmount: Function;
  tokenAmount: number;
}) {
  const [modalShown, setModalShown] = useState({ show: false });
  const [amountText, setAmountText] = useState("");

  function onClick() {
    setModalShown({ show: true });
  }
  function handleOnChange(params: BaseSyntheticEvent) {
    props.setTokenAmount(Number.parseFloat(params.target.value));
  }
  useEffect(() => {
    if (props.tokenAmount) setAmountText(props.tokenAmount.toString());
  }, [props.tokenAmount]);
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
      <SwapForm width={"90px"} onChange={handleOnChange} value={amountText} />
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
