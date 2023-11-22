import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import {
  MAIN_COLOR_ON_HOVER,
  MAIN_COMPONENT_COLOR,
  SECONDARY_INPUT_COLOR,
} from "../constants/colors";
import { changelog } from "../constants/changelog";

export function Changelog() {
  let keys: string[] = [];

  const changelogItems = changelog.map((changelog, index) => {
    keys.push(index.toString());
    const bullets = changelog.Bullets.map((bullet) => <li>{bullet}</li>);
    return (
      <Accordion.Item eventKey={index.toString()}>
        <Accordion.Header>{changelog.Heading}</Accordion.Header>
        <Accordion.Body>{bullets}</Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <Wrapper>
      <AccordionWrapper>
        <Accordion defaultActiveKey={keys} alwaysOpen>
          {changelogItems}
        </Accordion>
      </AccordionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AccordionWrapper = styled.div`
  padding-top: 10vh;
  width: 90%;
  max-height: 90vh;
  margin-left: 2%;
  font-size: 10px;
  overflow: auto !important;

  .accordion-button {
    background-color: ${MAIN_COMPONENT_COLOR};
  }
  .accordion-item {
    border-color: ${MAIN_COLOR_ON_HOVER};
    background-color: ${SECONDARY_INPUT_COLOR};
    border: none;
  }
  .accordion-body {
    font-size: 12px;
  }
`;
