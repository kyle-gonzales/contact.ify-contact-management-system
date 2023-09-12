import { useRouter } from "next/router";
import useContacts from "@/hooks/useContacts";
import LoadingIndicator from "@/components/LoadingIndicator";
import loadingStatus from "@/utils/loadingStatus";
import Table from "react-bootstrap/Table";
import useIsFavorite from "@/hooks/useIsFavorite";
import { Container } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const { contacts, setContacts, loadingState } = useContacts(router);

  const favorites = useMemo(
    () =>
      contacts
        .filter((contact) => contact.isFavorite == true)
        .sort((contact) => contact.lastName),
    [contacts]
  );

  const { patchIsFavorite } = useIsFavorite(contacts, setContacts);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;
  // use placeholder

  if (!contacts || contacts.length == 0)
    return (
      <div className="text-center m-5 p-5 display-6">
        No Contacts to Display
      </div>
    );

  return (
    <div>
      <Container>
        <Table borderless={true} hover={true} responsive>
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
            </tr>
            <tr>
              <td className="small text-muted" colSpan={3}>
                Favorite Contacts ({favorites.length})
              </td>
            </tr>
          </thead>
          <tbody>
            {favorites.map((contact) => (
              <tr key={contact.id} class="w-25">
                <td
                  onClick={() => router.push(`/contacts/${contact.contactId}`)}
                >
                  {contact.lastName}
                </td>
                <td
                  onClick={() => router.push(`/contacts/${contact.contactId}`)}
                >
                  {contact.firstName}
                </td>
                <td
                  onClick={() =>
                    patchIsFavorite(`contacts/${contact.contactId}`, contact)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {contact.isFavorite ? (
                    <i className="bi bi-star-fill align-middle" />
                  ) : (
                    <i className="bi bi-star align-middle" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <td className="small text-muted" colSpan={3}>
                Contacts ({contacts.length})
              </td>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td
                  onClick={() => router.push(`/contacts/${contact.contactId}`)}
                >
                  {contact.lastName}
                </td>
                <td
                  onClick={() => router.push(`/contacts/${contact.contactId}`)}
                >
                  {contact.firstName}
                </td>
                <td
                  onClick={() =>
                    patchIsFavorite(`contacts/${contact.contactId}`, contact)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {contact.isFavorite ? (
                    <i className="bi bi-star-fill align-middle" />
                  ) : (
                    <i className="bi bi-star " />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
