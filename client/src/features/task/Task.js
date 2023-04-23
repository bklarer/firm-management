import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskUpdated } from "../../slices/taskSlice";
import {dateHelper, timeHelper} from "../../helpers/dateTime";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { title, id, creator_id, due_date, project_id, completed } = task;
  const [checkbox, setCheckBox] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setCheckBox(completed ? true : false);
  }, [completed]);

  const handleCheckBox = (e) => {
    const newValue = e.target.checked ? true : false;
    setCheckBox(newValue);
    fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ completed: newValue }),
    })
      .then((resp) => resp.json())
      .then((changedTask) => {
        dispatch(taskUpdated(changedTask));
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <div className="task-card">
      <div className="task-title-container">
          <input
            className="task-completed"
            type="checkbox"
            value={checkbox}
            checked={checkbox}
            onChange={handleCheckBox}
          />
        <div className="title">{title}</div>
      </div>
      <div className="assigned">
        <p className="assigned-title" onClick={toggleDropdown}>Assigned ▼</p>
        {dropdownOpen && (
          <div className="assigned-list">
            <p>Person 1</p>
            <p>Person 2</p>
            <p>Person 3</p>
          </div>
        )}
      </div>
      <div className="date-due"><p>{task ? dateHelper(due_date) : null}</p></div>
      <div className="task-card-project"><p>Project</p></div>
      <div className="buttons button1">
          <Link className="link" to={`/${id}`}>View</Link>
      </div>
    </div>
  );
};

export default Task;
