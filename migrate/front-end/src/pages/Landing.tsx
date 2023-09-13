import styled from "styled-components";
import TradingBox from "../components/TradingBox";
import { TrendsTable } from "../components/TrendsTable";

export function Landing() {
  return (
    <Wrapper>
      <TradingBox tokenListURL="https://static.optimism.io/optimism.tokenlist.json" />
      <StyledTrendsTable />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5%;
`;

const StyledTrendsTable = styled(TrendsTable)`
  height: 35vh;
  width: 50vw;
  margin-top: 3vh;
`;
