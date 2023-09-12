import Button from "react-bootstrap/Button";

const EditButton = ({ onEditClicked }) => {
  return (
    <Button
      size="sm"
      className="ms-2"
      variant="outline-primary"
      onClick={onEditClicked}
    >
      Edit
    </Button>
  );
};

export default EditButton;
