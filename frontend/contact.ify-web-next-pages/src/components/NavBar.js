import Link from "next/link";
import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "./CustomToggle";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import useUser from "../hooks/useUser";

const NavBar = () => {
  const router = useRouter();
  const { user, setUser } = useUser(router);
  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
    router.reload();
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <Image
            src="/Contact.ify-white.svg"
            height={50}
            width={150}
            alt="Logo"
          />
        </Link>
        {/* Search bar with responsive classes */}
        <form className="d-grid col-4">
          <div className="input-group">
            <span className="input-group-text bg-white p-0">
              <i
                className="btn btn-outline-secondary border-0 bi bi-search btn-circle"
                onClick={() => {
                  alert("searching");
                }}
              />
            </span>
            <input
              placeholder="Search"
              className="form-control border-0"
              type="search"
            />
          </div>
        </form>
        <div className="navbar-right">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <Image src="/favicon.ico" height={40} width={40} alt="User" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/user">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger" onClick={logout}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
