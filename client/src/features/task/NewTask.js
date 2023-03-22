import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    due_date: "",
    due_time: "",
  });

  const formattedTask = {
    title: formData.title,
    notes: formData.notes,
    due_date: formData.due_Date + "T" + formData.due_time + ":00",
  };

  const [project, setProject] = useState(0);

  const [projectCheckbox, setProjectCheckbox] = useState(false);
  const [assignedCheckbox, setAssignedCheckbox] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form Data", formData);
    console.log("project_id", project);
    console.log("checkbox", projectCheckbox);

    fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formattedTask),
      }).then((resp) => resp.json())
      .then((data) => console.log(data))
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
          <select disabled={projectCheckbox ? false : true}>
            <option>Projects</option>
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
