import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectRemoved, projectUpdated, selectProjectById } from "../../slices/projectSlice";

const EditProject = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const [updatedProject, setUpdatedProject] = useState({
        title: "",
        notes: "",
        due_date: "",
        due_time: "",
      });

      const project = useSelector((state) => selectProjectById(state, parseInt(projectId)));

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
        })
          .then((resp) => resp.json())
          .then((changedProject) => {
            dispatch(projectUpdated(changedProject));
          });
      };

      const handleDeleteClick = () => {
        fetch(`/api/projects/${projectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
            navigate("/")
            dispatch(projectRemoved(parseInt(projectId)))
        });
      };

      let date = new Date().toISOString().slice(0, 10);

    return(

        <>
        <h1>Edit Project</h1>
        <form className="edit-task" onSubmit={handleSubmit}>
          <input
            name="title"
            onChange={handleFormChange}
            value={updatedProject.title}
            type="text"
            placeholder="Title"
          />
          <div>
            <label>
              Due Date:{" "}
              <input
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
                name="due_time"
                onChange={handleFormChange}
                value={updatedProject.due_time}
                type="time"
              />
            </label>
          </div>
          <input type="submit" />
        </form>
        <button onClick={handleDeleteClick}>Delete</button>
      </>

    )
}

export default EditProject;