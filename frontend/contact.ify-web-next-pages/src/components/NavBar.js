import Link from "next/link";
import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "./CustomToggle";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import useUserToken from "../hooks/useUserToken";
import { useState } from "react";

const NavBar = ({ togglePanel }) => {
  const router = useRouter();
  const { user, setUser } = useUserToken(router);
  const {
    ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]: userName,
  } = user ?? {};
  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
    router.replace("/auth/login");
  };

  const [searchInput, setSearchInput] = useState("");
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setSearchInput(value);
  };

  const search = (e) => {
    e.preventDefault();
    if (searchInput != null && searchInput.length !== 0) {
      router.push(`/search/${searchInput}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-light sticky-top navbar-shadow mb-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <i
            className="bi bi-list me-2 icon-btn"
            onClick={togglePanel}
            style={{ fontSize: "24px" }}
          />
          <Link href="/">
            <Image
              src="/Contact.ify-black.svg"
              height={50}
              width={150}
              alt="Logo"
            />
          </Link>
        </div>
        {/* Search bar */}
        <form className="d-grid col-4" onSubmit={search}>
          <div className="input-group">
            <span className="input-group-text bg-white p-0">
              <i
                className="btn btn-outline-secondary border-0 bi bi-search btn-circle"
                onClick={(e) => {
                  search(e);
                }}
              />
            </span>
            <input
              placeholder="Search"
              className="form-control border"
              type="search"
              value={searchInput}
              onChange={onValueChange}
            />
          </div>
        </form>
        <div className="navbar-right">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <i
                className="bi bi-person-circle icon-btn"
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="my-shadow">
              <small
                className="d-block p-0 text-truncate text-uppercase px-3 text-light-gray"
                style={{ maxWidth: "156px" }}
              >{`Hi, ${userName}!`}</small>
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
