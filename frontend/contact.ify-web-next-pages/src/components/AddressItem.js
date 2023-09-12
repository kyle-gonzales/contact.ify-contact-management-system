import { useState } from "react";
import EditButton from "./EditButton";

const AddressItem = ({ address }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {address.address}
      {isHovered && <EditButton />}
    </div>
  );
};

export default AddressItem;
