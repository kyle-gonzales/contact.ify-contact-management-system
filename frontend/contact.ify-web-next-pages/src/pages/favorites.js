import ContactRow from "@/components/ContactRow";
import Link from "next/link";
import { useEffect, useState } from "react";

const FavoriteList = () => {
  const [favorites, setContacts] = useState([]);

  return (
    <ul>
      {favorites.map((contact) => (
        <li key={contact.id}>
          <Link href={`/favorites/${contact.id}`}>
            <ContactRow contact={contact} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FavoriteList;
