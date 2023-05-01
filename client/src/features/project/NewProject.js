import { useState } from "react";
import { useDispatch } from "react-redux";
import { projectAdded, addProjectError } from "../../slices/projectSlice";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    due_date: "",
    due_time: "",
    notes: "",
  });

  const formattedProject = {
    title: formData.title,
    due_date: formData.due_date + "T" + formData.due_time + ":00",
    notes: formData.notes,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/projects", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedProject),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          navigate(-1);
          dispatch(projectAdded(data));
        });
      } else resp.json().then((error) => dispatch(addProjectError(error)));
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
    <div className="new-project-form">
      <h1>New Project</h1>
      <form onSubmit={handleSubmit} className="new-project">
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
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default NewProject;
