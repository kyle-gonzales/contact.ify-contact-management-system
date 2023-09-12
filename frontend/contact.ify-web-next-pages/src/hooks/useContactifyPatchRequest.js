import loadingStatus from "@/utils/loadingStatus";
import cookies from "js-cookie";
import { useCallback, useState } from "react";
import { API_BASE_URL } from "../../config";

const useContactifyPatchRequest = (router) => {
  const [loadingState, setLoadingState] = useState(null);

  const patch = useCallback(
    async (endpoint, payloadObj) => {
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

        //patch
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("Content-Type", "application/json");
        const options = {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(payloadObj),
        };
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

        console.log(response);

        if (!response.status === 204) {
          setLoadingState(loadingStatus.hasErrored);
        }
        setLoadingState(loadingStatus.loaded);
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    },
    [router]
  );

  return { loadingState, setLoadingState, patch };
};

export default useContactifyPatchRequest;
