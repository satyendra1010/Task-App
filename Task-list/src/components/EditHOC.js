import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import EditTask from "./Edit-Task";

const withRouter = (EditTask) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <EditTask {...props} params={params} navigate={navigate}  />;
};
export  const EditHOC =  withRouter(EditTask);
