import { useRouter } from "next/router";
import useContactifyPatchRequest from "./useContactifyPatchRequest";
import { useCallback } from "react";
import loadingStatus from "@/utils/loadingStatus";

const useIsFavorite = (contacts, setContacts) => {
  const router = useRouter();
  const { loadingState, setLoadingState, patch } =
    useContactifyPatchRequest(router);

  const patchIsFavorite = useCallback(
    async (endpoint, contact) => {
      const payload = { isFavorite: !contact.isFavorite };
      const updatedContact = { ...contact, isFavorite: !contact.isFavorite };

      await patch(endpoint, payload);

      if (loadingState === loadingStatus.hasErrored) {
        alert("failed to update contact");
      }

      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.contactId === contact.contactId ? updatedContact : c
        )
      );
    },
    [loadingState, patch, setContacts]
  );

  return { patchIsFavorite };
};

export default useIsFavorite;
