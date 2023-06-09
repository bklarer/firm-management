import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  selectProjectById,
  projectUpdated,
  addProjectError,
} from "../../slices/projectSlice";
import { selectTasksByProject } from "../../slices/taskSlice";
import Task from "../task/Task";
import { useState, useEffect } from "react";
import { dateHelper, timeHelper } from "../../helpers/dateTime";
import { NavLink } from "react-router-dom";

const ProjectView = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    selectProjectById(state, parseInt(projectId))
  );
  const tasks = useSelector((state) =>
    selectTasksByProject(state, parseInt(projectId))
  );
  const users = useSelector((state) => state.users.users);
  const [dropdown, setDropdown] = useState("all");
  const [checkbox, setCheckBox] = useState(false);
  let date = new Date().toISOString();

  useEffect(() => {
    setCheckBox(project && project.completed ? true : false);
  }, [project]);

  const handleCheckBox = (e) => {
    const newValue = e.target.checked ? true : false;
    setCheckBox(newValue);
    fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ completed: newValue }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((changedProject) => {
          dispatch(projectUpdated(changedProject));
        });
      } else {
        resp.json().then((error) => dispatch(addProjectError(error)));
      }
    });
  };

  const creator =
    users && project
      ? users.find((user) => user.id === project.creator_id)
      : null;

  const filteredTasks = () => {
    let newTasks = [];
    if (tasks.length > 0) {
      switch (dropdown) {
        case "not_completed":
          newTasks = [...tasks].filter((task) => task.completed === false);
          break;
        case "past_due":
          newTasks = [...tasks].filter(
            (task) => task.completed === false && task.due_date < date
          );
          break;
        case "completed":
          newTasks = [...tasks].filter((task) => task.completed === true);
          break;
        default:
          newTasks = [...tasks];
      }
      newTasks.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      );
    }
    return newTasks;
  };

  return (
    <div className="project-task-list">
      <h2>Project</h2>
      {project ? (
        <div className="project-details">
          <div className="project-details-container">
            <h2 className="title">{project.title}</h2>
            <div className="created">
              <u>Created:</u> <p>{dateHelper(project.created_at)}</p>
            </div>

            <div className="due-date">
              <u>Due Date:</u>{" "}
              <p>
                {dateHelper(project.due_date) +
                  " @ " +
                  timeHelper(project.due_date)}
              </p>
            </div>

            <div className="created-by">
              <u>Created By:</u>
              <p>
                {creator
                  ? `${creator.first_name} ${creator.last_name} `
                  : "Not Found"}
              </p>
            </div>
            <div>
              <u>Notes:</u>
              <p>{project.notes ? project.notes : "Add Notes"}</p>
            </div>
            <div>
              <u>Completed:</u>
              <input
                className="task-completed"
                type="checkbox"
                value={checkbox}
                checked={checkbox}
                onChange={handleCheckBox}
              />
            </div>
            <Link className="link" to={`edit`}>
              Edit
            </Link>
          </div>
        </div>
      ) : (
        <h2>No Project Found</h2>
      )}

      <div className="task-options">
        <select onChange={(e) => setDropdown(e.target.value)} value={dropdown}>
          <option default value="all">
            All
          </option>
          <option value="not_completed">Not complete</option>
          <option value="past_due">Past Due</option>
          <option value="completed">Completed</option>
        </select>{" "}
        <ul className="single-button">
          <NavLink className="project-link" to="/projects/new">
            <li>New Project</li>
          </NavLink>
        </ul>
      </div>
      <div className="task-label">
        <h3 className="task-title">Task</h3>
        <h3 className="task-assignee">Assignee</h3>
        <h3 className="task-date">Due Date</h3>
        <h3 className="task-project">Project</h3>
      </div>
      <div className="task-header">Tasks</div>
      <div className="task-list">
        {project && tasks.length > 0
          ? filteredTasks().map((task) => {
              return <Task key={task.id} task={task} />;
            })
          : null}
      </div>
    </div>
  );
};

export default ProjectView;
