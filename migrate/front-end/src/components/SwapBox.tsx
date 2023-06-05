import styled from "styled-components";
import { INPUT_COLOR } from "../colors";
import Button from "./Button";

export default function SwapBox(props: { buttonText: string }) {
  return (
    <Wrapper>
      <Button width="30%" height="100%" text={props.buttonText}></Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${INPUT_COLOR};
  width: 80%;
  height: 20%;
  border-radius: 15px;
`;
