import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import AuthLayout from "@/components/AuthLayout";
import Spinner from "react-bootstrap/Spinner";
import loadingStatus from "@/utils/loadingStatus";
import useLogIn from "@/hooks/useLogIn";

const Login = () => {
  const { logIn, logInCreds, setLogInCreds, loadingState, setLoadingState } =
    useLogIn();

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [arePasswordsVisible, setArePasswordsVisible] = useState(false);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setLogInCreds({ ...logInCreds, [name]: value });
    if (name === "userName") {
      if (value.length > 1) {
        setIsValidUserName(true);
        return;
      } else {
        setIsValidUserName(false);
        return;
      }
    } else if (name === "password") {
      if (value.length > 5) {
        setIsValidPassword(true);
        return;
      } else {
        setIsValidPassword(false);
        return;
      }
    }
  };

  return (
    <div className="d-flex flex-column vh-100 align-items-center justify-content-center">
      <Card className="auth-card my-shadow">
        <div className="mx-5 my-4">
          <Card.Img src="/Contact.ify-black.svg" alt="Logo" />
        </div>
        <Card.Body>
          <Form onSubmit={logIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={logInCreds.userName}
                onChange={onValueChange}
                name="userName"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type={arePasswordsVisible ? "text" : "password"}
                placeholder="Password"
                value={logInCreds.password}
                onChange={onValueChange}
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                label="Show Password"
                value={arePasswordsVisible}
                onChange={() => setArePasswordsVisible((prev) => !prev)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={
                !isValidPassword ||
                !isValidUserName ||
                loadingState === loadingStatus.isLoading
              }
              className="w-100 mt-2"
            >
              {loadingState !== loadingStatus.isLoading ? (
                "Log In"
              ) : (
                <Spinner as="span" animation="border" size="sm" className="" />
              )}
            </Button>
          </Form>
        </Card.Body>
        {loadingState === loadingStatus.hasErrored && (
          <Card.Footer className="bg-white">
            <div
              className="small text-danger text-center text-wrap m-auto"
              style={{ width: "90%" }}
            >
              Your username or password are incorrect. Please try again.
            </div>
          </Card.Footer>
        )}
      </Card>
      <p className="mt-3">
        New to Contact.ify?
        <Link href="/auth/register" className="ms-2 text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
