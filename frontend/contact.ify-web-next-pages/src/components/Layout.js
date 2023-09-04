import NavBar from "./NavBar";
import SidePanel from "./SidePanel";

const Layout = ({ children }) => {

  return (
    <div>
      <NavBar />
      <SidePanel />
      {children}
    </div>
  );
};

export default Layout;
