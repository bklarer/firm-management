import Task from "./Task";
import { fetchUsers } from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const TaskList = () => {
  const [dropdown, setDropdown] = useState("all");
  const tasks = useSelector((state) => state.tasks.tasks);
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
  //create state for task filter
  //state will be based off of dropdown
  //Use switch for different filtering options
  //filter all
  //filter completed, false
  //filter completed, true
  //filter date < today's date

  return (
    <>
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
        {tasks.length > 0
          ? filteredTasks().map((task) => {
              return <Task key={task.id} task={task} />;
            })
          : null}
      </div>
    </>
  );
};

export default TaskList;
