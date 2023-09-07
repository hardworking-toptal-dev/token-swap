import styled from "styled-components";
import {
  ACTIVE_COLOR,
  DISABLED_INPUT_COLOR,
  INPUT_COLOR,
  MAIN_COLOR,
  MAIN_COMPONENT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import { Button, Form, InputGroup } from "react-bootstrap";
import MainButton from "./MainButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { io } from "socket.io-client";
import {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { isConnected } from "../scripts/web3/frontend_web3";
import type { User as UserType } from "@prisma/client";
import EmojiPicker from "emoji-picker-react";
import Overlay from "react-bootstrap/Overlay";
import { UserContext } from "..";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(io());
  const [chats, setChats] = useState({ array: [] as JSX.Element[] });
  const [latestChat, setLatestChat] = useState(<></>);
  const [disabled, setDisabled] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const iconRef = useRef(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setWalletConnected((await isConnected()) ? true : false);
      const connectSocket = io("http://localhost:4000");
      console.log("Connecting to the server...");
      connectSocket.on("connect", () => {
        console.log("connected");
        setSocketConnected(true);
        if (user.id) {
          setDisabled(false);
          connectSocket.emit("data", {
            address: user.address,
            signature: user.signature,
          });
        }
      });
      connectSocket.on("disconnect", (reason: any) => {
        setDisabled(true);
        console.log("[INFO]: Client disconnected, reason: %s", reason);
      });

      socket.on("broadcast", (data) => {
        console.log("%s: %s", data.sender, data.msg);
        if (data.sender !== "transaction_client")
          setLatestChat(
            <IndividualChat
              key={Math.random()}
              user={data.sender}
              msg={data.msg}
            />
          );
        else {
          setLatestChat(
            <TransactionChat
              user={data.msg.username}
              sellToken={data.msg.sellToken}
              buyToken={data.msg.buyToken}
              buyAmount={data.msg.buyTokenAmount}
            ></TransactionChat>
          );
        }
        console.log(data.msg);
      });

      setSocket(connectSocket);
    })();
  }, [user, walletConnected, socketConnected]);

  useEffect(() => {
    setChats({
      array: [latestChat, ...chats.array],
    });
  }, [latestChat]);

  function sendMessage(input: string) {
    if (input)
      socket.emit("broadcast", {
        sender: user.address,
        signature: user.signature,
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
      <InputWrapper>
        <IconButton
          ref={iconRef}
          disabled={disabled}
          onClick={() => setShowEmojiSelector(!showEmojiSelector)}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </IconButton>
        <Overlay
          target={iconRef}
          show={showEmojiSelector}
          rootClose={true}
          onHide={() => setShowEmojiSelector(false)}
        >
          <EmojiWrapper>
            <EmojiPicker
              onEmojiClick={(e) => {
                setInput(input + e.emoji);
              }}
              width="100%"
              height="50vh"
            />
          </EmojiWrapper>
        </Overlay>
        <InputGroup className="rounded-2">
          <ChatInput
            onChange={(e: BaseSyntheticEvent) => setInput(e.target.value)}
            value={input}
            onKeyPress={(e: KeyboardEvent) => {
              if (e.key === "Enter") sendMessage(input);
            }}
            disabled={disabled}
          />
          <MainButton
            onClick={() => {
              sendMessage(input);
            }}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faRightToBracket} />
          </MainButton>
        </InputGroup>
      </InputWrapper>
    </Wrapper>
  );
}

function IndividualChat(props: { user: string; msg: string }) {
  return (
    <div>
      <Message>
        <HighlightedChat>{props.user}: </HighlightedChat>
        {props.msg}
      </Message>
    </div>
  );
}

function TransactionChat(props: {
  user: string;
  sellToken: string;
  buyToken: string;
  buyAmount: number;
}) {
  return (
    <TransactionMessage>
      <HighlightedChat>{props.user}</HighlightedChat> has bought{" "}
      <HighlightedChat>{props.buyAmount}</HighlightedChat> of{" "}
      <HighlightedChat>{props.buyToken}</HighlightedChat> with{" "}
      <HighlightedChat>{props.sellToken}</HighlightedChat>!
    </TransactionMessage>
  );
}

const Wrapper = styled.div`
  height: 95vh;
  width: 30vw;
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
  border-color: transparent;
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

const HighlightedChat = styled.span`
  font-weight: bold;
  color: ${MAIN_COLOR};
`;
const Message = styled.span`
  color: ${MAIN_TEXT_COLOR};
  font-size: 13px;
`;
const TransactionMessage = styled.span`
  color: ${MAIN_TEXT_COLOR};
  font-size: 11px;
  font-style: italic;
`;
const IconButton = styled(Button)`
  background-color: transparent !important;
  border-color: transparent !important;
  color: ${MAIN_TEXT_COLOR};
  margin-right: 5px;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  &:hover {
    background-color: transparent !important;
  }
  &:active {
    background-color: transparent !important;
  }
`;
const InputWrapper = styled.span`
  display: flex;
`;
const EmojiWrapper = styled.div`
  .EmojiPickerReact {
    --epr-skin-tone-picker-menu-color: ${MAIN_TEXT_COLOR};
    --epr-emoji-size: 25px;
    --epr-category-label-height: 20px;
    --epr-bg-color: ${INPUT_COLOR};
    --epr-picker-border-color: transparent;
    --epr-category-label-bg-color: ${INPUT_COLOR};
    --epr-text-color: ${MAIN_TEXT_COLOR};
  }
`;
