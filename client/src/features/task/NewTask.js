import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskAdded } from "../../slices/taskSlice";

const NewTask = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
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

  //setup assigning user

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask =
      projectCheckbox && projectId
        ? { ...formattedTask, project_id: projectId }
        : { ...formattedTask };

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(taskAdded(data));
      });
  };

  const handleFormChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  //update state in task slice

  let date = new Date().toISOString().slice(0, 10);

  return (
    <>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit} className="new-task">
        <input
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
              value={projectCheckbox}
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
              onChange={(e) => setAssignedCheckbox(e.target.checked)}
              value={assignedCheckbox}
              type="checkbox"
            />
          </label>
          <select disabled={assignedCheckbox ? false : true}>
            <option>Assigned</option>
          </select>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};

export default NewTask;
