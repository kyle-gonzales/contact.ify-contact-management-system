import { useCallback, useState } from "react";
import loadingStatus from "../utils/loadingStatus";
import cookies from "js-cookie";
import { API_BASE_URL } from "../../config";

const useContactifyDeleteRequest = (endpoint, router) => {
  const [loadingState, setLoadingState] = useState(null);

  const deleteRequest = useCallback(async () => {
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

      //DELETE
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
      // console.log(response);

      setLoadingState(loadingStatus.loaded);
      return response;
    } catch (error) {
      console.log(error);
      setLoadingState(loadingStatus.hasErrored);
    }
  }, [endpoint, router]);

  return { deleteRequest, loadingState, setLoadingState };
};

export default useContactifyDeleteRequest;
