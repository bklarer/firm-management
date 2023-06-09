import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskUpdated, addTaskError } from "../../slices/taskSlice";
import { dateHelper } from "../../helpers/dateTime";
import { selectAssignmentsByTaskId } from "../../slices/assignmentSlice";
import { selectProjectById } from "../../slices/projectSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { title, id, due_date, project_id, completed } = task;
  const [checkbox, setCheckBox] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userAssignments = useSelector((state) =>
    selectAssignmentsByTaskId(state, id)
  );
  const users = useSelector((state) => state.users.users);
  const assignedUsers = users.filter((user) =>
    userAssignments.find((assignment) => assignment.user_id === user.id)
  );
  const project = useSelector((state) => selectProjectById(state, project_id));

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
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((changedTask) => {
          dispatch(taskUpdated(changedTask));
        });
      } else resp.json().then((error) => dispatch(addTaskError(error)));
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
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
          <p className="assigned-title" onClick={toggleDropdown}>
            {assignedUsers.length} Assigned ▼
          </p>
          {dropdownOpen && (
            <div className="assigned-list">
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
          )}
        </div>
        <div className="date-due">
          <p>{task ? dateHelper(due_date) : null}</p>
        </div>
        <div className="task-card-project">
          <p>{project ? project.title : "No Project Assigned"}</p>
        </div>
        <Link className="link" to={`/${id}`}>
          <p>View</p>
        </Link>
      </div>

      <div className="task-card-mobile">
        <div className="task-title-container">
          <div className="title">{title}</div>{" "}
          <input
            className="task-completed"
            type="checkbox"
            value={checkbox}
            checked={checkbox}
            onChange={handleCheckBox}
          />
        </div>
        <div className="assigned">
          <p className="assigned-title" onClick={toggleDropdown}>
            <strong>Assignments: </strong>
            {assignedUsers.length} Assigned ▼
          </p>
          {dropdownOpen && (
            <div className="assigned-list">
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
          )}
        </div>
        <div className="date-due">
          <p>
            <strong>Due Date: </strong>
            {task ? dateHelper(due_date) : null}
          </p>
        </div>
        <div className="task-card-project">
          <p>
            <strong>Project: </strong>
            {project ? project.title : "No Project Assigned"}
          </p>
        </div>
        <Link className="link" to={`/${id}`}>
          <p>View</p>
        </Link>
      </div>
    </>
  );
};

export default Task;
