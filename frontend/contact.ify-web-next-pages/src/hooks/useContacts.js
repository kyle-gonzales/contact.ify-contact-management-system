import { useEffect, useState } from "react";
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

  return { contacts, setContacts, loadingState };
};

export default useContacts;
