import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  projectRemoved,
  projectUpdated,
  selectProjectById,
  addProjectError
} from "../../slices/projectSlice";
import { selectTasksByProject, taskUpdated } from "../../slices/taskSlice";
const EditProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [updatedProject, setUpdatedProject] = useState({
    title: "",
    notes: "",
    due_date: "",
    due_time: "",
  });

  const tasks = useSelector((state) =>
    selectTasksByProject(state, parseInt(projectId))
  );
  const project = useSelector((state) =>
    selectProjectById(state, parseInt(projectId))
  );

  console.log("tasks5", tasks);

  const formattedProject = {
    title: updatedProject.title,
    notes: updatedProject.notes,
    due_date: updatedProject.due_date + "T" + updatedProject.due_time + ":00",
  };

  useEffect(
    () =>
      project
        ? setUpdatedProject({
            title: project.title,
            notes: project.notes ? project.notes : "",
            due_date: project.due_date.slice(0, 10),
            due_time: project.due_date.slice(11, 16),
          })
        : undefined,
    [project]
  );

  const handleFormChange = (e) => {
    setUpdatedProject((updatedProject) => ({
      ...updatedProject,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit project", formattedProject);

    fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedProject),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((changedProject) => {
          navigate(-1);
          dispatch(projectUpdated(changedProject));
        });
      } else resp.json().then((errors) => dispatch(addProjectError(errors)));
    });
  };

  const handleDeleteClick = () => {
    fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      tasks.forEach((task) => {
        dispatch(taskUpdated({ ...task, project_id: null }));
      });
      dispatch(projectRemoved(parseInt(projectId)));
      navigate("/projects");
    });
  };

  let date = new Date().toISOString().slice(0, 10);

  return (
    <div className="edit-form">
      <h1>Edit Project</h1>
      <form className="edit-project" onSubmit={handleSubmit}>
        <input
          required
          name="title"
          onChange={handleFormChange}
          value={updatedProject.title}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="notes"
          onChange={handleFormChange}
          value={updatedProject.notes}
          placeholder="Notes"
        />
        <div>
          <label>
            Due Date:{" "}
            <input
              required
              name="due_date"
              onChange={handleFormChange}
              value={updatedProject.due_date}
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
              value={updatedProject.due_time}
              type="time"
            />
          </label>
        </div>
        <input className="submit" type="submit" />
      </form>
      <button className="delete" onClick={handleDeleteClick}>
        Delete Project
      </button>
    </div>
  );
};

export default EditProject;
