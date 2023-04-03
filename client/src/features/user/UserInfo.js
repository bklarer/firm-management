import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { selectUserById } from "../../slices/userSlice";
import Task from "../task/Task";

const UserInfo = () => {
  const [dropdown, setDropdown] = useState("all")
    const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, parseInt(userId)));
  const assignments = useSelector((state) =>  state.assignments.assignments).filter((assignment) => assignment.user_id === user.id)
  const taskIds = []
  
  assignments.forEach((assignment) => {
    taskIds.push(assignment.task_id);
  });

  const tasks = useSelector((state) => state.tasks.tasks).filter((task) => taskIds.includes(task.id));

  let date = new Date().toISOString()

  const filteredTasks = () => {
    let newTasks = []
    if(tasks.length > 0 ) {
        switch(dropdown) {
            case "not_completed":
                newTasks = tasks.filter((task) => task.completed === false)
            break;
            case "past_due":
                newTasks = tasks.filter((task) => task.completed === false && task.due_date < date)
            break;
            case "completed":
                newTasks = tasks.filter((task) => task.completed === true)
            break;
            default: 
            newTasks = tasks
        }
    }
    return newTasks
}

  return (
    <>
      <ul>
        <li>{user ? user.first_name : null}</li>
      </ul>
      <div className="task-filter">
      <select onChange={(e) => setDropdown(e.target.value)} value={dropdown}>
          <option default value="all">All</option>
          <option value="not_completed">Not complete</option>
          <option value="past_due">Past Due</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="task-list">
        {user && tasks.length > 0
          ? filteredTasks().map((task) => {
              return <Task key={task.id} task={task} />;
            })
          : null}
      </div>
    </>
  );
};

export default UserInfo;
