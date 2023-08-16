import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import {
  BANNER_COLOR,
  INPUT_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";
import MainButton from "./MainButton";
import {
  forceSignature,
  getAccount,
  getCookie,
  getSignature,
  isConnected,
} from "../scripts/web3/frontend_web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {
  Alert,
  Badge,
  Collapse,
  Fade,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import type { User } from "@prisma/client";
import { Signature } from "ethers";

export default function Banner(
  props: { setUser: Function } /* For testing chat server */
) {
  const [account, setAccount] = useState("");
  const [loginText, setLoginText] = useState("LOGIN");
  const [walletIcon, setWalletIcon] = useState(<WalletIcon icon={faWallet} />);
  const [loginFormHidden, setLoginFormHidden] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [loginHidden, setLoginHidden] = useState(false);
  const [signature, setSignature] = useState("");
  const [clickedLoginFlag, setClickedLoginFlag] = useState(false);
  const [forcedSignature, setForcedSignature] = useState(false);

  async function login() {
    setClickedLoginFlag(true);
    const addresses = (await getAccount()) as string[];
    setAccount(addresses[0]);
    if (await isConnected())
      if (!getCookie("signature")) {
        try {
          setSignature(await getSignature(account));
        } catch (e) {
          console.log(e);
        }
      } else {
        setSignature(await getSignature(account));
        const user = await fetch(
          `http://localhost:4500/users/${account}/${signature}`
        ).then((result) => result.json());
        if (!user) {
          setSignature(await forceSignature(account));
          setForcedSignature(true);
          setLoginHidden(true);
          setLoginFormHidden(false);
        } else {
          setLoginHidden(false);
          setLoginFormHidden(true);
          setLoginText(user.username);
          setWalletIcon(<></>);
          props.setUser(user);
        }
      }
  }
  async function createUser() {
    console.log(
      await fetch(
        `http://localhost:4500/createUser/${account}/${usernameInput}/${signature}`,
        { method: "POST" }
      )
    );
    const user: User = await fetch(
      `http://localhost:4500/users/${account}/${signature}`
    ).then((result) => result.json());
    setLoginText(user.username);
    setWalletIcon(<></>);
    setLoginHidden(false);
    setLoginFormHidden(true);
    props.setUser(user);
  }

  useEffect(() => {
    (async () => {
      if (await isConnected()) {
        setAccount(((await isConnected()) as string[])[0]);
        if (!getCookie("signature")) {
          if (!clickedLoginFlag) return;
          try {
            setSignature(await getSignature(account));
          } catch (e) {
            console.log(e);
          }
        } else {
          setSignature(await getSignature(account));
          const user = await fetch(
            `http://localhost:4500/users/${account}/${signature}`
          ).then((result) => result.json());
          if (!user) {
            if (!clickedLoginFlag || forcedSignature) return;
            setSignature(await forceSignature(account));
          }
        }
        const user = await fetch(
          `http://localhost:4500/users/${account}/${signature}`
        ).then((result) => result.json());

        if (user) {
          setLoginHidden(false);
          setLoginFormHidden(true);
          setLoginText(user.username);
          setWalletIcon(<></>);
          props.setUser(user);
        } else {
          setLoginHidden(true);
          setLoginFormHidden(false);
        }
      }
    })();
  }, [account, signature]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>CHATSWAP</Title>
        <StyledBadge>
          ALPHA <VersionText>v1.0</VersionText>
        </StyledBadge>
      </TitleWrapper>
      <LoginWrapper>
        <LoginFormWrapper>
          <InputGroup hidden={loginFormHidden}>
            <LoginForm
              placeholder="Enter username"
              onChange={(e: BaseSyntheticEvent) =>
                setUsernameInput(e.target.value)
              }
            />
            <LoginButton onClick={createUser}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </LoginButton>
          </InputGroup>
        </LoginFormWrapper>
        <LoginButton onClick={login} hidden={loginHidden}>
          {walletIcon}
          {loginText}
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
const VersionText = styled.span`
  font-size: 10px;
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
  margin-right: 10px;
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
  height: 4vh;
  font-size: 13px;
`;

const LoginFormWrapper = styled.span`
  height: 4vh !important;
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
