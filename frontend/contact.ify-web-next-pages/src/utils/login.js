import { API_BASE_URL } from "@/../config";
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const logIn = async (e, logInCreds, router) => {
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
    // const decoded = jwtDecode(token);

    cookies.set("jwt_authorization", token, {
      expires: 1,
    });
    router.replace("/");
  } catch (error) {
    console.log("something went wrong", error);
    throw error;
  }
};

export default logIn;
