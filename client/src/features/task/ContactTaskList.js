import Task from "./Task";
import { fetchUsers } from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../../slices/taskSlice";
import { useParams } from "react-router-dom";

const ContactTaskList = () => {
  const { userID } = useParams();

    //will need to use params to identify contact and grab their tasks and info


  return (
    <div className="task-list">
      {/* {tasks.length > 0
        ? tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })
        : null} */}
    </div>
  );
};

export default ContactTaskList;
