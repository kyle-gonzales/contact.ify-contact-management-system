import { useState } from "react";
import EditButton from "./EditButton";

const PhoneNumberItem = ({ phoneNumber }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {phoneNumber.phoneNumber}
      {isHovered && <EditButton />}
    </div>
  );
};

export default PhoneNumberItem;
