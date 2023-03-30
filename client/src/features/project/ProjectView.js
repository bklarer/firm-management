import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { selectProjectById } from "../../slices/projectSlice";
import { selectTasksByProject } from "../../slices/taskSlice";
import Task from "../task/Task";


const ProjectView = () => {
    const { projectId } = useParams()
    const project = useSelector((state) => selectProjectById(state, parseInt(projectId)))
    const tasks = useSelector((state) => selectTasksByProject(state, parseInt(projectId)))
    

    return (
        <>
        <ul>
            <li>{project ? project.title : null}</li>
        </ul>
        <div className="task-list">
            { project && tasks.length > 0 ? tasks.map((task) => {
                return (
                    <Task key={task.id} task={task} />
                )
            }) : null}
        </div>


        </>

    )


}

export default ProjectView