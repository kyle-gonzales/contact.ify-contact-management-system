import { useState } from "react";
import NavBar from "./NavBar";
import SidePanel from "./SidePanel";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={inter.className}>
      <NavBar togglePanel={togglePanel} />
      <SidePanel isOpen={isOpen} togglePanel={togglePanel} />
      {children}
    </div>
  );
};

export default Layout;
