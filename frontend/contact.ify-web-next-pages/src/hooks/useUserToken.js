import cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const useUserToken = (router) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = cookies.get("jwt_authorization");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const decodedUser = jwtDecode(token);
    console.log(decodedUser);
    setUser(decodedUser);
  }, [router]);

  return { user, setUser };
};

export default useUserToken;
