import loadingStatus from "@/utils/loadingStatus";
import Spinner from "react-bootstrap/Spinner";

const LoadingIndicator = ({ loadingState }) => {
  switch (loadingState) {
    case loadingStatus.isLoading:
      return (
        <div
          className="vw-100 my-vh-75 d-flex align-items-center justify-content-center px-2 pt-5"
          style={{ zIndex: 1002, paddingBottom: "68px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      );
    case loadingStatus.hasErrored:
      return (
        <div
          className="d-flex vw-100 my-vh-75 align-items-center justify-content-center text-center px-5 pt-5"
          style={{ zIndex: 1002, paddingBottom: "68px" }}
        >
          <div className="display-6 text-info">
            Uh Oh... Something went wrong... Please try reloading your screen!
          </div>
        </div>
      );
    case loadingStatus.notFound:
      return (
        <div
          className="d-flex vw-100 my-vh-75 align-items-center justify-content-center text-center px-5 pt-5"
          style={{ zIndex: 1002, paddingBottom: "68px" }}
        >
          <div className="display-6 text-danger">
            Uh Oh... Not Found! Check your URL...
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
};

export default LoadingIndicator;
