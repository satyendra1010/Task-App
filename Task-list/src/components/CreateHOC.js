import { useNavigate } from "react-router-dom";
import  CreateTask  from "./Create-Task"

const withRouter = (CreateTask) => (props) => {
  const navigate = useNavigate();

  return <CreateTask {...props}  navigate={navigate}  />;
};
export  const CreateHOC =  withRouter(CreateTask);
