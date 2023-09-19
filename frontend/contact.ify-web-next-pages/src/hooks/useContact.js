import { useState, useEffect } from "react";
import useContactifyGetRequest from "./useContactifyGetRequest";

const emptyContact = {
  contactId: -1,
  name: "No Name",
  isFavorite: false,
  emails: [],
  phoneNumbers: [],
  addresses: [],
};

const useContact = (router) => {
  const endpoint = router.query.id ? `contacts/${router.query.id}` : null;

  const [contact, setContact] = useState(emptyContact);
  const { get, loadingState } = useContactifyGetRequest(endpoint, router);
  useEffect(() => {
    const fetchContactById = async () => {
      const result = await get();
      // console.log(result);
      if (result != null) {
        setContact(result);
      }
    };
    fetchContactById();
  }, [get]);

  return { contact, setContact, loadingState };
};

export default useContact;
