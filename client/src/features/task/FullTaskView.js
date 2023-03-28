import { useDispatch, useSelector } from "react-redux";
import { selectTaskById } from "../../slices/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

const FullTaskView = () => {
    const { taskId } = useParams();
    
    const task = useSelector((state) => selectTaskById(state, parseInt(taskId)))

    console.log("task", task)

    return (

        <div>
            <div className="title">Task:</div>
            <div className="project">Project:  </div>
            <div className="created">
                <div><u>Created</u></div>
                <div>10-23-23</div>
            </div>
            <div className="date-due">
                <div><u>Due</u></div>
                <div>10-23-23</div>
            </div>
            <div className="assigned">
                <div><u>Assigned</u></div>
                <div>Benjamin Klarer</div>
            </div>
            <div className="created-by">
                <div><u>Created By</u></div>
                <div>Benjamin Klarer</div>
            </div>
        </div>

    )




}


export default FullTaskView