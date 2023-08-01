import styled from "styled-components";
import {
  DISABLED_INPUT_COLOR,
  INPUT_COLOR,
  MAIN_COLOR,
  MAIN_COMPONENT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import { Form, InputGroup } from "react-bootstrap";
import MainButton from "./MainButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { isConnected } from "../scripts/web3/swap";

export default function ChatBox(props: { username: string }) {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(io());
  const [chats, setChats] = useState({ array: [] as JSX.Element[] });
  const [latestChat, setLatestChat] = useState(<></>);
  const [disabled, setDisabled] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    (async () => {
      if (props.username && (await isConnected())) {
        setWalletConnected((await isConnected()) ? true : false);
        const connectSocket = io("http://localhost:4000");
        console.log("Connecting to the server...");
        connectSocket.on("connect", () => {
          setDisabled(false);
          console.log(`[INFO]: Welcome ${props.username}`);
        });
        connectSocket.on("disconnect", (reason: any) => {
          setDisabled(true);
          console.log("[INFO]: Client disconnected, reason: %s", reason);
        });
        // (async () => {
        //   if (!(await isConnected())) {
        //     setDisabled(true);
        //     console.log(!(await isConnected()));
        //   }
        // })();

        socket.on("broadcast", (data) => {
          console.log("%s: %s", data.sender, data.msg);
          setLatestChat(
            <IndividualChat
              key={Math.random()}
              user={data.sender}
              msg={data.msg}
            />
          );
          console.log(latestChat);
        });

        setSocket(connectSocket);
      }
    })();
  }, [props.username, walletConnected]);

  useEffect(() => {
    setChats({
      array: [latestChat, ...chats.array],
    });
  }, [latestChat]);

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
        <>{chats.array}</>
      </IncomingChats>
      <InputGroup>
        <ChatInput
          onChange={(e: BaseSyntheticEvent) => setInput(e.target.value)}
          value={input}
          onKeyPress={(e: KeyboardEvent) => {
            if (e.key === "Enter") sendMessage(input);
          }}
          disabled={disabled}
        ></ChatInput>
        <MainButton
          onClick={() => {
            sendMessage(input);
          }}
          disabled={disabled}
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
  &:disabled {
    background-color: ${DISABLED_INPUT_COLOR} !important;
    border-color: ${DISABLED_INPUT_COLOR} !important;
  }
  font-size: 12px;
`;

const IncomingChats = styled.div`
  height: 93%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  word-wrap: break-word;
`;

const User = styled.span`
  color: ${MAIN_TEXT_COLOR};
  font-size: 13px;
`;
const Message = styled.span`
  color: ${MAIN_COLOR};
  font-size: 13px;
`;
