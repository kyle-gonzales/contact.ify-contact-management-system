import { useEffect, useMemo, useState } from "react";
import useGetRequest from "./useContactifyGetRequest";

const useContacts = (router) => {
  const [contacts, setContacts] = useState([]);
  const { get, loadingState } = useGetRequest("contacts", router);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await get();
      setContacts(contacts);
    };
    fetchContacts();
  }, [get]);

  const favorites = useMemo(
    () =>
      !contacts
        ? []
        : contacts
            .filter((contact) => contact.isFavorite == true)
            .sort((contact) => contact.lastName),
    [contacts]
  );

  return { contacts, setContacts, favorites, loadingState };
};

export default useContacts;