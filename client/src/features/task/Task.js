import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskUpdated } from "../../slices/taskSlice";

const Task = ({ task }) => {
    const dispatch = useDispatch()
    const { title, id, creator_id, due_date, project_id, completed } = task;
    const [checkbox, setCheckBox] = useState(false)
  //Need to set data to object and see how I want to serialize data from backend

    useEffect(()=>{
        setCheckBox(completed ? true : false)
    }, [completed])
    
   const handleCheckBox = (e) => {
    const newValue = e.target.checked ? true : false
    setCheckBox(newValue)
        fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({completed: newValue}),
          })
            .then((resp) => resp.json())
            .then((changedTask) => {
              dispatch(taskUpdated(changedTask));
            });
    }

  return (
    <div className="task-box">
      <div className="checkbox">
        <input className="task-completed" type="checkbox" value={checkbox} checked={checkbox} onChange={handleCheckBox}/>
      </div>
      <div className="title">Task: {title}</div>
      <div className="project">Project: </div>
      <div className="created">
        <div>
          <u>Created</u>
        </div>
        <div>10-23-23</div>
      </div>
      <div className="date-due">
        <div>
          <u>Due</u>
        </div>
        <div>10-23-23</div>
      </div>
      <div className="assigned">
        <div>
          <u>Assigned</u>
        </div>
        <div>Benjamin Klarer</div>
      </div>
      <div className="created-by">
        <div>
          <u>Created By</u>
        </div>
        <div>Benjamin Klarer</div>
      </div>
      <div className="buttons button1">
        <button>
          <Link to={`/${id}`}>View</Link>
        </button>
      </div>
      <div className="buttons button2">
        <button>
          <Link to={`/${id}/edit`}>Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default Task;
