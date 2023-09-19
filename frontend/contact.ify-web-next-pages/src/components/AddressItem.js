import { useState } from "react";
import EditButton from "./EditButton";
import Button from "react-bootstrap/Button";
import addressTypes from "@/utils/addressTypes";

const AddressItem = ({ address, onEditClicked }) => {
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
      className="d-flex align-items-center"
    >
      <small className="text-muted text-uppercase me-2">
        ({addressTypes[address.addressType - 1]})
      </small>
      <span>{address.address}</span>
      {isHovered ? (
        <EditButton onEditClicked={onEditClicked} />
      ) : (
        <Button size="sm" style={{ visibility: "hidden" }}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default AddressItem;
