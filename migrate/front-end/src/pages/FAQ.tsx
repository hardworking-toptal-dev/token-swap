import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import {
  INPUT_COLOR,
  MAIN_COLOR_ON_HOVER,
  MAIN_COMPONENT_COLOR,
} from "../constants/colors";
import { FAQs } from "../constants/FAQ";

export function Faq() {
  let keys: string[] = [];

  const FAQItems = FAQs.map((faq, index) => {
    keys.push(index.toString());
    return (
      <Accordion.Item eventKey={index.toString()}>
        <Accordion.Header>{faq.Heading}</Accordion.Header>
        <Accordion.Body>{faq.Body}</Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <Wrapper>
      <AccordionWrapper>
        <Accordion defaultActiveKey={keys} alwaysOpen>
          {FAQItems}
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
    background-color: ${INPUT_COLOR};
    border: none;
  }
  .accordion-body {
    font-size: 12px;
  }
`;
