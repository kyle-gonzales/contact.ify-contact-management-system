import Button from "react-bootstrap/Button";

const AddButton = ({ onEditClicked }) => {
  return (
    <Button
      size="sm"
      className="ms-2"
      variant="outline-primary"
      onClick={onEditClicked}
    >
      Add
    </Button>
  );
};

export default AddButton;
