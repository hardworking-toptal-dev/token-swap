import {
  faPenToSquare,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownButton,
  Modal,
  InputGroup,
  Dropdown,
  Form,
} from "react-bootstrap";
import styled from "styled-components";
import {
  MAIN_COLOR,
  MAIN_TEXT_COLOR,
  MAIN_COLOR_ON_HOVER,
  ACTIVE_COLOR,
  INPUT_COLOR,
  MAIN_COMPONENT_COLOR,
} from "../constants/colors";
import MainButton from "./MainButton";
import { BaseSyntheticEvent, useContext, useState } from "react";
import { UserContext } from "..";
import { ENDPOINTS_ADDRESS } from "../constants/ip_address";

export function UserButton(props: { hidden: boolean }) {
  const { user, setUser } = useContext(UserContext);

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newUsernameValue, setNewUsernameValue] = useState(user.username);

  async function requestNewUsername() {
    if (newUsernameValue) {
      const newUser = await fetch(
        `http://${ENDPOINTS_ADDRESS}/changeUsername/${user.address}/${user.signature}/${newUsernameValue}`,
        {
          method: "POST",
        }
      );

      setUser(await newUser.json());
      setShowEditUserModal(false);
    }
  }

  return (
    <UserButtonWrapper>
      <DropdownButton title={user.username} hidden={props.hidden}>
        <UserItem eventKey="1" onClick={() => setShowEditUserModal(true)}>
          Change Username <FontAwesomeIcon icon={faPenToSquare} />
        </UserItem>
      </DropdownButton>
      <StyledModal
        show={showEditUserModal}
        onHide={() => {
          setShowEditUserModal(false);
          setNewUsernameValue(user.username);
        }}
      >
        <Modal.Header closeButton={true}>Change Username</Modal.Header>
        <StyledModalBody>
          <InputGroup>
            <StyledInput
              placeholder="New Username..."
              onChange={(event: BaseSyntheticEvent) =>
                setNewUsernameValue(event.target.value)
              }
              value={newUsernameValue}
            />
            <MainButton onClick={requestNewUsername}>
              <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
            </MainButton>
          </InputGroup>
        </StyledModalBody>
        <StyledModalFooter />
      </StyledModal>
    </UserButtonWrapper>
  );
}

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
  font-size: 13px;
`;
const UserButtonWrapper = styled.div`
  .btn-primary {
    height: 4vh;
    font-size: 13px;
    display: flex;
    align-items: center;
    background-color: ${MAIN_COLOR};
    border-color: ${MAIN_COLOR};
    color: ${MAIN_TEXT_COLOR};

    &:hover {
      background-color: ${MAIN_COLOR_ON_HOVER};
      color: ${ACTIVE_COLOR};
    }
    &:active {
      background-color: ${MAIN_COLOR};
      border-color: ${MAIN_COLOR};
    }
  }
  .dropdown-menu {
    background-color: ${MAIN_COLOR};
  }
`;
const UserItem = styled(Dropdown.Item)`
  background-color: ${MAIN_COLOR};
  font-size: 13px;
  color: ${MAIN_TEXT_COLOR};
  &:hover {
    background-color: ${MAIN_COLOR_ON_HOVER};
    color: ${ACTIVE_COLOR};
  }
  &:active {
    color: ${ACTIVE_COLOR};
  }
`;
const StyledModal = styled(Modal)`
  .modal-content {
    color: ${MAIN_COLOR};
    background-color: ${MAIN_COMPONENT_COLOR};
  }
`;
const StyledModalFooter = styled(Modal.Footer)`
  border: none;
`;
const StyledModalBody = styled(Modal.Body)`
  padding-top: 8%;
`;
