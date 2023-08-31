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
