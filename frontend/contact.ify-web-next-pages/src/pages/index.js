import Link from "next/link";
import ContactRow from "@/components/ContactRow";
import { useRouter } from "next/router";
import useContacts from "@/hooks/useContacts";
import LoadingIndicator from "@/components/LoadingIndicator";
import loadingStatus from "@/utils/loadingStatus";

export default function Home() {
  const router = useRouter();
  const { contacts, setContacts, loadingState } = useContacts(router);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;
    // use placeholder

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
    </div>
  );
}
