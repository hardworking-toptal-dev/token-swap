import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BANNER_COLOR,
  INPUT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import MainButton from "./MainButton";
import { getAccount, isConnected } from "../scripts/web3/swap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import {
  Alert,
  Badge,
  Collapse,
  Fade,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { Login } from "@mui/icons-material";

export default function Banner(
  props: { setAddress: Function } /* For testing chat server */
) {
  const [account, setAccount] = useState("");
  const [loginText, setLoginText] = useState("LOGIN");
  const [walletIcon, setWalletIcon] = useState(<WalletIcon icon={faWallet} />);
  const [showLoginForm, setShowLoginForm] = useState(false);

  async function login() {
    const addresses = (await getAccount()) as string[];
    setAccount(addresses[0]);

    console.log(
      await fetch(`http://localhost:4500/users/${account}`).then((result) =>
        result.json()
      )
    ); //testing querying backend api
  }

  useEffect(() => {
    const getIsConnected = async () => {
      if (await isConnected())
        setAccount(((await isConnected()) as string[])[0]);
    };
    getIsConnected();
    if (account) {
      setLoginText(account);
      setWalletIcon(<></>);
    }
  }, [account]);

  props.setAddress(account);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>CHATSWAP</Title>
        <StyledBadge>ALPHA</StyledBadge>
      </TitleWrapper>
      <LoginWrapper>
        <Fade in={showLoginForm}>
          <LoginForm placeholder="Enter username" />
        </Fade>
        <LoginButton text={loginText} onClick={login}>
          {walletIcon}
        </LoginButton>
      </LoginWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-weight: bolder;
  color: ${MAIN_TEXT_COLOR};
  font-size: 30px;
  position: absolute;
  background-color: ${BANNER_COLOR};
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1%;
  padding-right: 1%;
`;

const StyledBadge = styled(Badge)`
  font-size: 12px;
  margin-left: 5%;
  background-color: black;
`;
const Title = styled.h2`
  margin-top: 2%;
`;
const TitleWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const WalletIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
`;

const LoginForm = styled(Form.Control)`
  background-color: ${INPUT_COLOR};
  border-color: ${INPUT_COLOR};
  form {
    overflow: hidden;
  }
  input {
    float: right;
    clear: both;
  }
  width: 30%;
  height: 4vh;
  margin-right: 10px;
  font-size: 13px;
`;

const LoginWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
`;

const LoginButton = styled(MainButton)`
  height: 4vh;
  font-size: 13px;
  display: flex;
  align-items: center;
`;
