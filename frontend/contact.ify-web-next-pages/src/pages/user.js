import ContactModal from "@/components/ContactModal";
import CustomToggle from "@/components/CustomToggle";
import LoadingIndicator from "@/components/LoadingIndicator";
import UserForm from "@/components/UserForm";
import useEditUser from "@/hooks/useEditUser";
import useUser from "@/hooks/useUser";
import loadingStatus from "@/utils/loadingStatus";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Dropdown, Row } from "react-bootstrap";

const defaultUser = {
  userName: "",
};

const User = () => {
  const router = useRouter();

  const [showEditUser, setShowEditUser] = useState(false);
  const [newUser, setNewUser] = useState(defaultUser);
  const handleShowEditUser = () => {
    setShowEditUser(true);
    setNewUser(user);
  };
  const handleCloseEditUser = () => {
    setShowEditUser(false);
    setNewUser(defaultUser);
  };

  const { user, setUser, loadingState } = useUser(router);

  const {
    editUser,

    lastNameErrorMsg,
    setLastNameErrorMsg,
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    emailErrorMsg,
    setEmailErrorMsg,
  } = useEditUser(
    user,
    setUser,
    newUser,
    setNewUser,
    handleCloseEditUser,
    router
  );

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <div>
      <ContactModal
        show={showEditUser}
        handleClose={handleCloseEditUser}
        isAdd={true}
        type="User"
      >
        <UserForm
          submitForm={editUser}
          user={newUser}
          setUser={setNewUser}
          lastNameErrorMsg={lastNameErrorMsg}
          setLastNameErrorMsg={setLastNameErrorMsg}
          firstNameErrorMsg={firstNameErrorMsg}
          setFirstNameErrorMsg={setFirstNameErrorMsg}
          emailErrorMsg={emailErrorMsg}
          setEmailErrorMsg={setEmailErrorMsg}
        />
      </ContactModal>
      <div>
        <Container>
          <Row></Row>
          <Row>
            <div className="d-flex mb-3 pb-3 align-items-center justify-content-between border-bottom">
              <div
                className="display-4 text-truncate mw-100"
                // style={{ maxWidth: "156px" }}
              >{`Welcome, ${user.userName}!`}</div>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <i
                    className="bi bi-three-dots-vertical icon-btn"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="my-shadow">
                  <Dropdown.Item onClick={handleShowEditUser}>
                    Edit
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="mb-3">
              <p className="p-0 m-0 text-muted">First Name</p>
              <h3>
                {user.firstName ?? (
                  <span className="text-light-gray fst-italic">
                    not yet set
                  </span>
                )}
              </h3>
            </div>
            <div className="mb-3">
              <p className="p-0 m-0 text-muted">Last Name</p>
              <h3>
                {user.lastName ?? (
                  <span className="text-light-gray fst-italic">
                    not yet set
                  </span>
                )}
              </h3>
            </div>
            <div className="mb-3">
              <p className="p-0 m-0 text-muted">E-mail</p>
              <h3>
                {user.email ?? (
                  <span className="text-light-gray fst-italic">
                    not yet set
                  </span>
                )}
              </h3>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default User;
