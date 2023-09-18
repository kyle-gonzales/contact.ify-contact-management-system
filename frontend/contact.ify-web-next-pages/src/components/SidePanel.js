import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Row, Table } from "react-bootstrap";

const SidePanel = ({ isOpen, togglePanel }) => {
  const router = useRouter();

  return (
    <div className={`side-panel ${isOpen ? "open" : ""}`} id="side-panel">
      <div className="side-panel-content">
        <Container>
          <Row className="mb-3">
            <Button
              variant="outline-primary"
              href="/new"
              size="lg"
              className=""
              onClick={() => {
                togglePanel();
                router.push("/new");
              }}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-plus" style={{ fontSize: "24px" }} />
                <span>New Contact</span>
              </div>
            </Button>
          </Row>
          <Row>
            <Table borderless hover>
              <tbody>
                <tr>
                  <td
                    className="bg-light"
                    onClick={() => {
                      togglePanel();
                      router.push("/");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person-lines-fill me-2" />
                      <span>Contacts</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    className="bg-light"
                    onClick={() => {
                      togglePanel();
                      router.push("/favorites");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="bi bi-star-fill me-2" />
                      <span>Favorites</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SidePanel;
