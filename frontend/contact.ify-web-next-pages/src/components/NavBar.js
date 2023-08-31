import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav>
      <input placeholder="Search" />
      <Link href="/">
        <Image src="/favicon.ico" height={50} width={50} alt="Logo" />
      </Link>
      <Link href="/user">
        <Image src="/vercel.svg" height={32} width={100} alt="User" />
      </Link>
    </nav>
  );
};

export default NavBar;
