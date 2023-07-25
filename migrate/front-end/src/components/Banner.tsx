import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BANNER_COLOR, MAIN_TEXT_COLOR } from "../constants/colors";
import MainButton from "./MainButton";
import { getAccount, isConnected } from "../scripts/swap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

export default function Banner() {
  const [account, setAccount] = useState("");
  const [loginText, setLoginText] = useState("Login");
  const [walletIcon, setWalletIcon] = useState(<WalletIcon icon={faWallet} />);

  async function login() {
    const addresses = (await getAccount()) as string[];
    setAccount(addresses[0]);
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

  return (
    <Wrapper>
      <h2>CHATSWAP</h2>
      <MainButton text={loginText} width={""} onClick={login}>
        {walletIcon}
      </MainButton>
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
  padding-top: 5px;
  padding-left: 1%;
  padding-right: 1%;
`;

const WalletIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
`;
