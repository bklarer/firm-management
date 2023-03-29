import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { selectUserById } from "../../slices/userSlice";
import Task from "../task/Task";

const UserInfo = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, parseInt(userId)))

    return(
        <>
        <ul>
            <li>{user ? user.first_name : null}</li>
        </ul>
        <div className="task-list">
        { user && user.tasks.length > 0 ? user.tasks.map((task) => {
                return (
                    <Task key={task.id} task={task} />
                )
            }) : null}
        </div>
        </>

    )


}

export default UserInfo