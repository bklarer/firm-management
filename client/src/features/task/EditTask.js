import { useDispatch, useSelector } from "react-redux";
import { selectTaskById, taskRemoved, taskUpdated } from "../../slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const projects = useSelector((state) => state.projects.projects);  
  const [projectCheckbox, setProjectCheckbox] = useState(false);
  const [assignedCheckbox, setAssignedCheckbox] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    notes: "",
    due_date: "",
    due_time: "",
  });
  const [projectId, setProjectId] = useState("")
  
  const task = useSelector((state) => selectTaskById(state, parseInt(taskId)));

  const formattedTask = {
    title: updatedTask.title,
    notes: updatedTask.notes,
    due_date: updatedTask.due_date + "T" + updatedTask.due_time + ":00",
  };

  useEffect(() => {
    if (task) {
      const updatedTask = {
        title: task.title,
        notes: task.notes,
        due_date: task.due_date.slice(0, 10),
        due_time: task.due_date.slice(11, 16)
      };
      if (task.project_id) {
        setProjectId(task.project_id);
        setProjectCheckbox(true)
      }
      setUpdatedTask(updatedTask);
    }
  }, [task]);

  const handleFormChange = (e) => {
    setUpdatedTask((updatedTask) => ({
      ...updatedTask,
      [e.target.name]: e.target.value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask =
    projectCheckbox && projectId
      ? { ...formattedTask, project_id: projectId }
      : { ...formattedTask, project_id: null };

    console.log("new task", newTask)
    fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((resp) => resp.json())
      .then((changedTask) => {
        dispatch(taskUpdated(changedTask));
      });
  };

  const handleDeleteClick = () => {
    fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
        navigate("/")
        dispatch(taskRemoved(parseInt(taskId)))
    });
  };

  let date = new Date().toISOString().slice(0, 10);

  return (
    <>
      <h1>Edit Task</h1>
      <form className="edit-task" onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleFormChange}
          value={updatedTask.title}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="notes"
          onChange={handleFormChange}
          value={updatedTask.notes}
          placeholder="Notes"
        />
        <div>
          <label>
            Due Date:{" "}
            <input
              name="due_date"
              onChange={handleFormChange}
              value={updatedTask.due_date}
              type="date"
              min={date}
            />
          </label>
          <label>
            Due Time:{" "}
            <input
              name="due_time"
              onChange={handleFormChange}
              value={updatedTask.due_time}
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
            value={projectId}
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
        </div>
        <input type="submit" />
      </form>
      <button onClick={handleDeleteClick}>Delete</button>
    </>
  );
};

export default EditTask;
