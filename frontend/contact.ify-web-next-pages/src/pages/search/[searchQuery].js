import useContacts from "@/hooks/useContacts";
import useIsFavorite from "@/hooks/useIsFavorite";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const Search = () => {
  const router = useRouter();
  const { contacts, setContacts } = useContacts(router);

  const searchQuery = router.query.searchQuery;
  const searchResults = useMemo(() => {
    if (!searchQuery || !contacts) return [];
    return contacts.filter((contact) => {
      const query = searchQuery.toLowerCase();
      const firstName = contact.firstName
        ? contact.firstName.toLowerCase()
        : "";
      const lastName = contact.lastName.toLowerCase();

      return firstName.includes(query) || lastName.includes(query);
    });
  }, [contacts, searchQuery]);

  const { patchIsFavorite } = useIsFavorite(contacts, setContacts);

  return (
    <div>
      <Container>
        <Table borderless={true} hover={true} responsive>
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
                {`Search Results for \"${searchQuery}\" (${searchResults.length})`}
              </td>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((contact) => (
              <tr key={contact.id} className="hover-effect">
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
    </div>
  );
};

export default Search;
