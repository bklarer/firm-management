import { useDispatch, useSelector } from "react-redux";
import { selectTaskById } from "../../slices/taskSlice";
import { useParams, useNavigate, Link } from "react-router-dom";

const FullTaskView = () => {
  const { taskId } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const users = useSelector((state) => state.users.users);
  const task = useSelector((state) => selectTaskById(state, parseInt(taskId)));
  const project =
    task && task.project_id
      ? projects.find((project) => project.id === task.project_id)
      : null;
  const creator = task
    ? users.find((user) => user.id === task.creator_id)
    : null;

  return (
    <div className="task-full-view-container">
      <div className="task-full-view">
        <h2 className="title">{task ? task.title : "none"}</h2>
        <div className="project">
          <u>Project:</u>{" "}
          <p>{project ? project.title : "Not assigned to a project"} </p>
        </div>
        <div className="created">
          <u>Created: </u> <p>{task ? task.created_at : null}</p>
        </div>
        <div className="date-due">
          <u>Due:</u> <p>{task ? task.due_date : null}</p>
        </div>
        <div className="assigned">
          <u>Assigned:</u> <p>Benjamin Klarer</p>
        </div>
        <div className="created-by">
          <u>Created By:</u>{" "}
          <p>
            {creator
              ? creator.first_name + " " + creator.last_name
              : "Not Found"}
          </p>
        </div>
        <div>
          <u>Notes:</u> <p>{task ? task.notes : null}</p>
        </div>
        <Link className="link" to={`/${taskId}/edit`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default FullTaskView;
