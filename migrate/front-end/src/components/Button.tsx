import styled from "styled-components";
import { MAIN_COLOR, MAIN_COLOR_ON_CLICK, MAIN_TEXT_COLOR } from "../colors";

export default function Button(props: {
  text: string;
  width: string;
  height: string;
}) {
  const Button = styled.button`
    &:active {
      background-color: ${MAIN_COLOR_ON_CLICK};
    }
    height: ${props.height};
    width: ${props.width};
    border-radius: 15px;
    background-color: ${MAIN_COLOR};
    color: ${MAIN_TEXT_COLOR};
    text-align: center;
    outline: none;
    border: none;
    padding: 5px 5px;
  `;
  return <Button>{props.text}</Button>;
}
