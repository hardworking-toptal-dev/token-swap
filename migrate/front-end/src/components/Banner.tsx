import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  ACTIVE_COLOR,
  BANNER_COLOR,
  INPUT_COLOR,
  MAIN_COLOR,
  MAIN_COLOR_ON_HOVER,
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
import { faRightToBracket, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Badge, Form, InputGroup } from "react-bootstrap";
import type { User } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { UserButton } from "./UserButton";
import { UserContext } from "..";
import logo from "../resources/logo.png";

export default function Banner() {
  const [account, setAccount] = useState("");
  const [loginFormHidden, setLoginFormHidden] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [loginButtonHidden, setLoginButtonHidden] = useState(false);
  const [userButtonHidden, setUserButtonHidden] = useState(true);
  const [signature, setSignature] = useState("");
  const [clickedLoginFlag, setClickedLoginFlag] = useState(false);
  const [forcedSignature, setForcedSignature] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

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
          setLoginButtonHidden(true);
          setLoginFormHidden(false);
        } else {
          setLoginButtonHidden(true);
          setLoginFormHidden(true);
          // setLoginText(user.username);
          // setWalletIcon(<></>);
          setUser(user);
          setUserButtonHidden(false);
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
    // setLoginText(user.username);
    // setWalletIcon(<></>);
    setLoginButtonHidden(true);
    setLoginFormHidden(true);
    setUser(user);
    setUserButtonHidden(false);
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
          setLoginButtonHidden(true);
          setLoginFormHidden(true);
          // setLoginText(user.username);
          // setWalletIcon(<></>);
          setUser(user);
          setUser(user);
          setUserButtonHidden(false);
        } else {
          setLoginButtonHidden(true);
          setLoginFormHidden(false);
        }
      }
    })();
  }, [account, signature]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Logo
          src={logo}
          onClick={() => {
            navigate("/");
          }}
        />
        <StyledBadge>
          ALPHA <VersionText>v1.0</VersionText>
        </StyledBadge>
      </TitleWrapper>
      <LoginWrapper>
        <LoginFormWrapper>
          <InputGroup hidden={loginFormHidden}>
            <StyledInput
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
        <LoginButton onClick={login} hidden={loginButtonHidden}>
          <WalletIcon icon={faWallet} /> LOGIN
        </LoginButton>
        <UserButton hidden={userButtonHidden} />
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
  z-index: 999;
`;

const StyledBadge = styled(Badge)`
  font-size: 12px;
  margin-left: 5%;
  background-color: black;
`;
const VersionText = styled.span`
  font-size: 10px;
`;
const Logo = styled.img`
  /* margin-top: 2%; */
  width: 175px;
  &:hover {
    cursor: pointer;
  }
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

const StyledInput = styled(Form.Control)`
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
