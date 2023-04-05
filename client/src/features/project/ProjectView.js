import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectProjectById } from "../../slices/projectSlice";
import { selectTasksByProject } from "../../slices/taskSlice";
import Task from "../task/Task";

const ProjectView = () => {
  const { projectId } = useParams();
  const project = useSelector((state) =>
    selectProjectById(state, parseInt(projectId))
  );
  const tasks = useSelector((state) =>
    selectTasksByProject(state, parseInt(projectId))
  );

  tasks.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  console.log("project tasks", tasks)

  return (
    <>
      <ul>
        {project ? (
          <ul>
            <li>project.title </li>
            <div>
              <button className="buttons button2">
                <Link to={`edit`}>Edit</Link>
              </button>
            </div>
          </ul>
        ) : null}
      </ul>
      <div className="task-list">
        {project && tasks.length > 0
          ? tasks.map((task) => {
              return <Task key={task.id} task={task} />;
            })
          : null}
      </div>
    </>
  );
};

export default ProjectView;
