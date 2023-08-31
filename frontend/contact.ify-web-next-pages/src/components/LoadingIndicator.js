import loadingStatus from "@/utils/loadingStatus";

const LoadingIndicator = ({ loadingState }) => {
  switch (loadingState) {
    case loadingStatus.isLoading:
      return <div>loading...</div>;
    case loadingStatus.hasErrored:
    default:
      return <div>error</div>;
  }
};

export default LoadingIndicator;
