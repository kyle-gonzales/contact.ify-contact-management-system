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
      const result = await response.json();

      setLoadingState(loadingStatus.loaded);
      // console.log(result);
      return result;
    } catch {
      setLoadingState(loadingStatus.hasErrored);
    }
  }, [endpoint, router]);

  return { get, loadingState };
};

export default useContactifyGetRequest;
