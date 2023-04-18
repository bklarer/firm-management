import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectProjectById } from "../../slices/projectSlice";
import { selectTasksByProject } from "../../slices/taskSlice";
import Task from "../task/Task";
import { useState } from "react";

const ProjectView = () => {
  const { projectId } = useParams();
  const project = useSelector((state) =>
    selectProjectById(state, parseInt(projectId))
  );
  const tasks = useSelector((state) =>
    selectTasksByProject(state, parseInt(projectId))
  );
  const [dropdown, setDropdown] = useState("all");
  let date = new Date().toISOString();

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

  console.log("project tasks", tasks);

  return (
    <div className="project-task-list">
      {project ? (
        <div className="project-details">
          <h2>{project.title} </h2>
          <Link className="link" to={`edit`}>
            Edit
          </Link>
        </div>
      ) : null}
      <div className="task-filter">
        <select onChange={(e) => setDropdown(e.target.value)} value={dropdown}>
          <option default value="all">
            All
          </option>
          <option value="not_completed">Not complete</option>
          <option value="past_due">Past Due</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="task-label">
        <h3 className="task-title">Task</h3>
        <h3 className="task-assignee">Assignee</h3>
        <h3 className="task-date">Due Date</h3>
        <h3 className="task-project">Project</h3>
      </div>
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
