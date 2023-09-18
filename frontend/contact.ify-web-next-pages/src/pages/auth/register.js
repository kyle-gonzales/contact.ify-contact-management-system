import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import AuthLayout from "@/components/AuthLayout";
import Spinner from "react-bootstrap/Spinner";
import loadingStatus from "@/utils/loadingStatus";
import useRegister from "@/hooks/useRegister";

const Register = () => {
  const {
    register,
    registerCreds,
    setRegisterCreds,
    loadingState,
    setLoadingState,
    isValidUserName,
    setIsValidUserName,
    isValidPassword,
    setIsValidPassword,
    isValidConfirmPassword,
    setIsValidConfirmPassword,
    userNameErrorMsg,
    setUserNameErrorMsg,
    passwordErrorMsg,
    setPasswordErrorMsg,
    confirmPasswordErrorMsg,
    setConfirmPasswordErrorMsg,
  } = useRegister();

  const [arePasswordsVisible, setArePasswordsVisible] = useState(false);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setRegisterCreds({ ...registerCreds, [name]: value });
    if (name === "userName") {
      if (value.length > 1 || value.length === 0) {
        setIsValidUserName(true);
        setUserNameErrorMsg(null);
        return;
      } else {
        setIsValidUserName(false);
        return;
      }
    } else if (name === "password") {
      if (value.length > 5 || value.length === 0) {
        setIsValidPassword(true);
        setPasswordErrorMsg(null);
        return;
      } else {
        setIsValidPassword(false);
        return;
      }
    }
  };

  return (
    <div className="d-flex flex-column vh-100 align-items-center justify-content-center">
      <Card className="auth-card">
        <div className="mx-5 my-4">
          <Card.Img src="/Contact.ify-black.svg" alt="Logo" />
        </div>
        <Card.Body>
          <Form onSubmit={register}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={registerCreds.userName}
                onChange={onValueChange}
                name="userName"
                isInvalid={!isValidUserName}
              />
              <Form.Control.Feedback type="invalid">
                {userNameErrorMsg ??
                  "Username must be at least 2 character long"}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type={arePasswordsVisible ? "text" : "password"}
                placeholder="Password"
                value={registerCreds.password}
                onChange={onValueChange}
                name="password"
                isInvalid={!isValidPassword}
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrorMsg ??
                  "Password must be at least 6 characters long"}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                required
                type={arePasswordsVisible ? "text" : "password"}
                placeholder="Password"
                value={registerCreds.confirmPassword}
                onChange={onValueChange}
                name="confirmPassword"
                isInvalid={!isValidConfirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {confirmPasswordErrorMsg ?? "Passwords don't match. Try again"}
              </Form.Control.Feedback>
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
              disabled={loadingState === loadingStatus.isLoading}
              className="w-100 mt-2"
            >
              {loadingState !== loadingStatus.isLoading ? (
                "Register"
              ) : (
                <Spinner as="span" animation="border" size="sm" className="" />
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <p className="mt-3">
        Already have an account?
        <Link href="/auth/login" className="ms-2 text-primary">
          Log In
        </Link>
      </p>
    </div>
  );
};

Register.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Register;
