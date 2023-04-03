import { useDispatch, useSelector } from "react-redux";
import { selectTaskById, taskRemoved, taskUpdated } from "../../slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    notes: "",
    due_date: "",
    due_time: "",
  });
  const task = useSelector((state) => selectTaskById(state, parseInt(taskId)));

  const formattedTask = {
    title: updatedTask.title,
    notes: updatedTask.notes,
    due_date: updatedTask.due_date + "T" + updatedTask.due_time + ":00",
  };

  useEffect(
    () =>
      task
        ? setUpdatedTask({
            title: task.title,
            notes: task.notes,
            due_date: task.due_date.slice(0, 10),
            due_time: task.due_date.slice(11, 16),
          })
        : undefined,
    [task]
  );

  const handleFormChange = (e) => {
    setUpdatedTask((updatedTask) => ({
      ...updatedTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedTask),
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
        <input type="submit" />
      </form>
      <button onClick={handleDeleteClick}>Delete</button>
    </>
  );
};

export default EditTask;
