import { useSelector} from "react-redux";





const SideTasks = () => {
    const tasks = useSelector((state) => state.tasks.tasks);


    return (

        <div className="side-tasks">

            {/* { tasks.length > 0 ? tasks.map((task) => {
                return (
                    <div key={task.id}>{task.title}</div>
                )
            }) : null} */}
        </div>

    )
}

export default SideTasks