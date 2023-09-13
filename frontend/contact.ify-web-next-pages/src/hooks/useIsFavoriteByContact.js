import { useRouter } from "next/router";
import useContactifyPatchRequest from "./useContactifyPatchRequest";
import { useCallback, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";

const useIsFavoriteByContact = (contact, setContact) => {
  const router = useRouter();
  const { loadingState, setLoadingState, patch } =
    useContactifyPatchRequest(router);

  const patchIsFavorite = useCallback(
    async (endpoint) => {
      const payload = { isFavorite: !contact.isFavorite };
      const updatedContact = { ...contact, isFavorite: !contact.isFavorite };

      await patch(endpoint, payload);

      if (loadingState === loadingStatus.hasErrored) {
        alert("failed to update contact");
      }
      setContact(updatedContact);
    },
    [loadingState, patch, setContact, contact]
  );

  return { patchIsFavorite };
};

export default useIsFavoriteByContact;
