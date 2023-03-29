import Task from "./Task";
import { fetchUsers } from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { fetchTasks } from "../../slices/taskSlice";


const TaskList = () => {

    
    const tasks = useSelector((state) => state.tasks.tasks);
    

    return(

        <div className="task-list">
            {/* { tasks.length > 0 ? tasks.map((task) => {
                return (
                    <Task key={task.id} task={task} />
                )
            }) : null} */}
        </div>


    )



}


export default TaskList;