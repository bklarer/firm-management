import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskAdded, addTaskError } from "../../slices/taskSlice";
import { assignmentAdded } from "../../slices/assignmentSlice";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const users = useSelector((state) => state.users.users);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    due_date: "",
    due_time: "",
  });

  const [projectId, setProjectId] = useState(undefined);

  const formattedTask = {
    title: formData.title,
    notes: formData.notes,
    due_date: formData.due_date + "T" + formData.due_time + ":00",
  };

  const [projectCheckbox, setProjectCheckbox] = useState(false);
  const [assignedCheckbox, setAssignedCheckbox] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask =
      projectCheckbox && projectId
        ? { ...formattedTask, project_id: projectId }
        : { ...formattedTask };

    const userIds = assignedUsers.map((user) => user.id);

    const finalTask =
      userIds.length > 0 ? { ...newTask, user_ids: userIds } : newTask;

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(finalTask),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          navigate("/");
          dispatch(taskAdded(data.task));

          if (data.assignments.length) {
            data.assignments.forEach((assignment) => {
              dispatch(assignmentAdded(assignment));
            });
          }
        });
      } else resp.json().then((error) => dispatch(addTaskError(error)));
    });
  };

  const handleFormChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAssignedUsers = (e) => {
    const user = users.find((user) => user.id === parseInt(e.target.value));
    if (assignedUsers.find((assignedUser) => assignedUser.id === user.id)) {
      setAssignedUsers(
        assignedUsers.filter((assignedUser) => assignedUser.id !== user.id)
      );
    } else {
      setAssignedUsers([...assignedUsers, user]);
    }
  };

  const handleUnassign = (userId) => {
    setAssignedUsers((assignedUsers) =>
      assignedUsers.filter((user) => user.id !== userId)
    );
  };

  const handleAssignCheckbox = (e) => {
    if (!e.target.checked) {
      setAssignedUsers([]);
    }
    setAssignedCheckbox(e.target.checked);
  };

  //left off of dropbox, trying to figure adding a user, removing from dropbox and adding below with an x
  //will need to handle reseting the dropbox and assigned array when clicking the checkbox for assigned

  let date = new Date().toISOString().slice(0, 10);

  return (
    <div className="new-task-form">
      <div className="title-box">
        <h1>New Task</h1>
        <button className="go-back" onClick={goBack}>Go back</button>
      </div>
      <form onSubmit={handleSubmit} className="new-task">
        <input
          required
          name="title"
          onChange={handleFormChange}
          value={formData.title}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="notes"
          onChange={handleFormChange}
          value={formData.notes}
          placeholder="Notes"
        />
        <div>
          <label>
            Due Date:{" "}
            <input
              required
              name="due_date"
              onChange={handleFormChange}
              value={formData.due_date}
              type="date"
              min={date}
            />
          </label>
          <label>
            Due Time:{" "}
            <input
              required
              name="due_time"
              onChange={handleFormChange}
              value={formData.due_time}
              type="time"
            />
          </label>
        </div>
        <div>
          <label>
            Project?
            <input
              name="project_checkbox"
              onChange={(e) => setProjectCheckbox(e.target.checked)}
              checked={projectCheckbox}
              type="checkbox"
            />
          </label>
          <select
            name="project_id"
            disabled={projectCheckbox ? false : true}
            onChange={(e) => setProjectId(e.target.value)}
            value={projectId || ""}
          >
            <option default disabled value="">
              Pick One
            </option>
            {projects.map((project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>
            Assign?
            <input
              name="assigned_checkbox"
              onChange={handleAssignCheckbox}
              checked={assignedCheckbox}
              type="checkbox"
            />
          </label>
          <select
            disabled={assignedCheckbox ? false : true}
            onChange={handleAssignedUsers}
            value=""
          >
            <option default disabled value="">
              Pick users
            </option>
            {users.map((user) => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >{`${user.first_name} ${user.last_name}`}</option>
              );
            })}
          </select>
          {assignedUsers.map((user) => (
            <div className="assigned" key={user.id}>
              <span>{`${user.first_name} ${user.last_name}`}</span>
              <button onClick={() => handleUnassign(user.id)}>x</button>
            </div>
          ))}
        </div>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default NewTask;
