import { useCallback, useState } from "react";
import loadingStatus from "../utils/loadingStatus";
import cookies from "js-cookie";
import { API_BASE_URL } from "../../config";
import jwtDecode from "jwt-decode";

const useContactifyPostRequest = (endpoint, router) => {
  const [loadingState, setLoadingState] = useState(null);

  const post = useCallback(
    async (body, isBodyString=false) => {
      setLoadingState(loadingStatus.isLoading);

      try {
        //validate token
        const token = cookies.get("jwt_authorization");
        if (!token) {
          router.push("/auth/login");
          return;
        }
        const {
          ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]:
            userId,
        } = jwtDecode(token);

        // check endpoint, esp for router.query.id;
        // https://github.com/vercel/next.js/discussions/11484
        if (!endpoint) return;

        const bodyValue = isBodyString ? body : JSON.stringify({ userId, ...body })

        //POST
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: bodyValue,
        };
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options); //specific POST hook handles errors
        console.log(response);

        setLoadingState(loadingStatus.loaded);
        return response;
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    },
    [endpoint, router]
  );

  return { post, loadingState, setLoadingState };
};

export default useContactifyPostRequest;
