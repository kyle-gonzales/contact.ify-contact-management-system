import { useCallback, useState } from "react";
import loadingStatus from "../utils/loadingStatus";
import cookies from "js-cookie";
import { API_BASE_URL } from "../../config";

const useContactifyGetRequest = (endpoint, router) => {
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  const get = useCallback(async () => {
    setLoadingState(loadingStatus.isLoading);
    try {
      //validate token
      const token = cookies.get("jwt_authorization");
      let result = null;
      if (!token) {
        router.push("/auth/login");
        return;
      }

      // check endpoint, esp for router.query.id;
      // https://github.com/vercel/next.js/discussions/11484
      if (!endpoint) return;

      //get
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      const options = { headers: headers };
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

      if (response.status === 204) {
        result = null;
        setLoadingState(loadingStatus.loaded);
      } else if (response.status === 200) {
        console.log(response);
        result = await response.json();
        console.log(result);
        setLoadingState(loadingStatus.loaded);
      } else if (response.status > 400 && response.status <= 499) {
        setLoadingState(loadingStatus.notFound);
      }
      return result;
    } catch (error) {
      console.log(error);
      setLoadingState(loadingStatus.hasErrored);
    }
  }, [endpoint, router]);

  return { get, loadingState };
};

export default useContactifyGetRequest;
