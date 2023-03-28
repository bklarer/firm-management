import { useDispatch, useSelector } from "react-redux";
import { selectTaskById } from "../../slices/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
    const { taskId } = useParams();
    
    const task = useSelector((state) => selectTaskById(state, parseInt(taskId)))


    return (





    <form className="edit-task">
        <input placeholder="Title"/>
        <input type="textera" placeholder="Notes"/>
        <input placeholder="Created At"/>
        <label>
            Due Date: {" "}
        <input type="date" />
        </label>
        <select>
            <option>Assigned</option>
        </select>
        <input placeholder="Created By"/>
        <label>
            Project?
            <input type="checkbox"/>
        </label>
        <select>
            <option>Projects</option>
        </select>
        <input type="submit"/>
    </form>


    )




}

export default EditTask