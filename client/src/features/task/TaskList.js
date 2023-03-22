import Task from "./Task";
import { fetchUsers } from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"



const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    
    console.log("task", tasks)

    return(

        <div className="task-list">
            {tasks.map((task) => {
                return (
                    <Task key={task.id} task={task} />
                )
            })}
        </div>


    )



}


export default TaskList;