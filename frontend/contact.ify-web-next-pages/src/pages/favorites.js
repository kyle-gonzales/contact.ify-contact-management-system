import LoadingIndicator from "@/components/LoadingIndicator";
import useContacts from "@/hooks/useContacts";
import useIsFavorite from "@/hooks/useIsFavorite";
import loadingStatus from "@/utils/loadingStatus";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const FavoriteList = () => {
  const router = useRouter();
  const { contacts, setContacts, favorites, loadingState } =
    useContacts(router);
  const { patchIsFavorite } = useIsFavorite(contacts, setContacts);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <Container>
      <Table borderless hover responsive>
        <thead>
          <tr>
            <th>
              <h5>Last Name</h5>
            </th>
            <th>
              <h5>First Name</h5>
            </th>
          </tr>
          <tr>
            <td className="small text-muted" colSpan={3}>
              Favorite Contacts ({favorites.length})
            </td>
          </tr>
        </thead>
        <tbody>
          {favorites.map((contact) => (
            <tr key={contact.id} className="hover-effect">
              <td onClick={() => router.push(`/contacts/${contact.contactId}`)}>
                {contact.lastName}
              </td>
              <td onClick={() => router.push(`/contacts/${contact.contactId}`)}>
                {contact.firstName}
              </td>
              <td
                onClick={() =>
                  patchIsFavorite(`contacts/${contact.contactId}`, contact)
                }
                style={{ cursor: "pointer" }}
                className="hover-effect"
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
      </Table>
    </Container>
  );
};

export default FavoriteList;
