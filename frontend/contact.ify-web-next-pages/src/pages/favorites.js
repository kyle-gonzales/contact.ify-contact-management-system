import ContactRow from "@/components/ContactRow";
import Link from "next/link";
import { useEffect, useState } from "react";

const FavoriteList = () => {
  const [favorites, setContacts] = useState([]);
  // useEffect(() => {
  //   const fetchHouses = async () => {
  //     const headers = new Headers();
  //     headers.append("Authorization", `Bearer ${TOKEN}`);

  //     const options = {
  //       headers: headers,
  //     };

  //     const response = await fetch(`${API_BASE_URL}/favorites`, options);
  //     const favorites = await response.json();
  //     setContacts(favorites);
  //   };
  //   fetchHouses();
  // }, []);

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
