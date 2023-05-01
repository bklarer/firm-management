import { useSelector } from "react-redux";
import { selectTaskById } from "../../slices/taskSlice";
import { useParams, Link } from "react-router-dom";
import { dateHelper, timeHelper } from "../../helpers/dateTime";
import { selectAssignmentsByTaskId } from "../../slices/assignmentSlice";

const FullTaskView = () => {
  const { taskId } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const users = useSelector((state) => state.users.users);
  const task = useSelector((state) => selectTaskById(state, parseInt(taskId)));
  const userAssignments = useSelector((state) =>
    selectAssignmentsByTaskId(state, parseInt(taskId))
  );
  const assignedUsers = users.filter((user) =>
    userAssignments.find((assignment) => assignment.user_id === user.id)
  );

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
          <u>Created: </u> <p>{task ? dateHelper(task.created_at) : null}</p>
        </div>
        <div className="date-due">
          <u>Due:</u>{" "}
          <p>
            {task
              ? dateHelper(task.due_date) + " @ " + timeHelper(task.due_date)
              : null}
          </p>
        </div>
        <div className="assigned">
          <u>Assigned:</u>{" "}
          <div className="task-view-assigned">
            {assignedUsers.length > 0
              ? assignedUsers.map((user) => {
                  return (
                    <p key={user.id}>
                      {user.first_name + " " + user.last_name}
                    </p>
                  );
                })
              : "No one assigned"}
          </div>
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
