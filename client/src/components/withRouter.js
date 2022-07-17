// this is for using hooks in class based components
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    let { state } = useLocation();

    return <Component {...{ state, navigate }} {...props} />;
  };

  return Wrapper;
};