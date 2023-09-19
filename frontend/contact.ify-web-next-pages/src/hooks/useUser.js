import { useEffect, useState } from "react";
import useContactifyGetRequest from "./useContactifyGetRequest";

const defaultUser = {
  userName: "",
};

const useUser = (router) => {
  const [user, setUser] = useState(defaultUser);
  const { get, loadingState } = useContactifyGetRequest("users", router);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await get();
      setUser(user ?? defaultUser);
    };
    fetchUser();
  }, [get]);

  return {
    user,
    setUser,
    loadingState,
  };
};

export default useUser;
