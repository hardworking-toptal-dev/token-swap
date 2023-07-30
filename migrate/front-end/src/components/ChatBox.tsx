import styled from "styled-components";
import {
  INPUT_COLOR,
  MAIN_COMPONENT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import { Form, InputGroup } from "react-bootstrap";
import MainButton from "./MainButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from "react";
import { Socket } from "socket.io";
import { randomInt } from "crypto";

export default function ChatBox(props: { username: string }) {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(io());
  const [chats, setChats] = useState([] as JSX.Element[]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (props.username) {
      const connectSocket = io("http://localhost:4000");
      console.log("Connecting to the server...");
      connectSocket.on("connect", () => {
        console.log(`[INFO]: Welcome ${props.username}`);
      });
      connectSocket.on("disconnect", (reason: any) => {
        console.log("[INFO]: Client disconnected, reason: %s", reason);
      });

      socket.on("broadcast", (data) => {
        console.log("%s: %s", data.sender, data.msg);
        chats.push(
          <IndividualChat user={data.sender} msg={data.msg}></IndividualChat>
        );
        setChats(chats);
      });

      setSocket(connectSocket);
    }
  }, [props.username]);

  function sendMessage(input: string) {
    if (input)
      socket.emit("broadcast", {
        sender: props.username,
        action: "broadcast",
        msg: input,
      });
    setInput("");
  }

  return (
    <Wrapper className="rounded-3">
      <IncomingChats>
        <>{chats}</>
      </IncomingChats>
      <InputGroup>
        <ChatInput
          onChange={(e: BaseSyntheticEvent) => setInput(e.target.value)}
          value={input}
          onKeyPress={(e: KeyboardEvent) => {
            if (e.key === "Enter") sendMessage(input);
          }}
        ></ChatInput>
        <MainButton
          onClick={() => {
            sendMessage(input);
          }}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </MainButton>
      </InputGroup>
    </Wrapper>
  );
}

function IndividualChat(props: { user: string; msg: string }) {
  return (
    <div>
      <User>{props.user}: </User>
      <Message>{props.msg}</Message>
    </div>
  );
}

const Wrapper = styled.div`
  height: 95vh;
  width: 25vw;
  margin-top: 10px;
  background-color: ${MAIN_COMPONENT_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  padding-top: 50px;
`;
const ChatInput = styled(Form.Control)`
  background-color: ${INPUT_COLOR};
`;

const IncomingChats = styled.div`
  height: 93%;
  width: 100%;
  overflow-y: auto;
  /* white-space: pre-wrap; */
  /* white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap; */
  word-wrap: break-word;
`;

const User = styled.span`
  color: blue;
  font-size: 13px;
`;
const Message = styled.span`
  color: ${MAIN_TEXT_COLOR};
  font-size: 13px;
`;
