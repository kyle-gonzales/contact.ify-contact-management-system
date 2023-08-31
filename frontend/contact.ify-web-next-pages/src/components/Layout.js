import NavBar from "./NavBar";
import SidePanel from "./SidePanel";


const Layout = ({ children }) => {
  return (
    <div>
      <SidePanel />
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;