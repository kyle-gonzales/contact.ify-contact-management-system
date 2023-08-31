"use client";

import Link from "next/link";
import ContactRow from "@/components/ContactRow";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import useUser from "@/hooks/useUser";
import useContacts from "@/hooks/useContacts";

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser(router);
  const { contacts, setContacts, loadingState } = useContacts(router);

  // console.log(contacts);

  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
    router.reload();
  };

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     const token = cookies.get("jwt_authorization");
  //     if (!token) {
  //       router.push("/auth/login");
  //       return;
  //     }

  //     const headers = new Headers();
  //     headers.append("Authorization", `Bearer ${token}`);

  //     const options = {
  //       headers: headers,
  //     };

  //     const response = await fetch(`${API_BASE_URL}/contacts`, options);
  //     const contacts = await response.json();
  //     setContacts(contacts);
  //   };
  //   fetchContacts();
  // }, [router]);

  if (!contacts) return "No Contacts to display";

  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.contactId}>
            <Link href={`/contacts/${contact.contactId}`}>
              <ContactRow contact={contact} />
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
