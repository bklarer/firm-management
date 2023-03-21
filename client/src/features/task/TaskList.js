import Task from "./Task";
import { fetchUsers } from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"



const TaskList = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const loadData = () => dispatch(fetchUsers()) 
        loadData()
      },[dispatch])

    return(

        <div className="task-list">
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
        </div>


    )



}


export default TaskList;