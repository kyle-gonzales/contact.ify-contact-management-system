import { useState } from "react";
import { API_BASE_URL } from "../../../config";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";

const { default: AuthLayout } = require("@/components/AuthLayout");

const Login = () => {
  const router = useRouter();
  const [logInCreds, setLogInCreds] = useState({ userName: "", password: "" });

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setLogInCreds({ ...logInCreds, [name]: value });
  };

  const logIn = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInCreds),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, options);
      if (!response.ok) {
        alert("failed to log in");
        return;
      }
      const token = await response.text();
      console.log(token);
      const decoded = jwtDecode(token);

      cookies.set("jwt_authorization", token, {
        expires: 1,
      });
      router.replace("/");
    } catch (error) {
      console.log("something went wrong", error);
      throw error;
    }
  };

  return (
    <div>
      <form onSubmit={logIn}>
        <input
          type="text"
          name="userName"
          value={logInCreds.userName}
          placeholder="Username"
          onChange={onValueChange}
        />
        <input
          type="password"
          name="password"
          value={logInCreds.password}
          onChange={onValueChange}
          placeholder="Password"
        />
        <button>Log In</button>
        <p>
          New to Contact.ify?
          <Link href="/auth/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
