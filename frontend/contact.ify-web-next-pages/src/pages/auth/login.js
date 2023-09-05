import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import AuthLayout from "@/components/AuthLayout";
import logIn from "@/utils/login";

const Login = () => {
  const router = useRouter();
  const [logInCreds, setLogInCreds] = useState({ userName: "", password: "" });
  console.log(logInCreds);
  const [isValid, setIsValid] = useState(true);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setLogInCreds({ ...logInCreds, [name]: value });
  };

  return (
    <div className="d-flex vh-100 align-items-center">
      <Container className="col-12 col-md-6 col-lg-4 m-auto">
        <Card className="container-fluid">
          <div className="row justify-content-center">
            <div className=" col-8">
              <Card.Img
                src="/Contact.ify-black.svg"
                alt="Logo"
                width={50}
                height={150}
              />
            </div>
          </div>
          <Card.Body>
            <Form
              noValidate
              validate={isValid}
              onSubmit={(e) => {
                logIn(e, logInCreds, router);
              }}
            >
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
                  type="password"
                  placeholder="Password"
                  value={logInCreds.password}
                  onChange={onValueChange}
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  {/* change to normal text and move outside the form */}
                  Password is incorrect
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <p className="mt-3">
          New to Contact.ify?
          <Link href="/auth/register" className="ms-2 text-primary">
            Register
          </Link>
        </p>
      </Container>
    </div>
  );
};

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
