import { useSelector} from "react-redux";

const ProjectList = () => {
    const projects = useSelector((state) => state.projects.projects);

    const showDueDate = (date) => {
        const formattedDate = date.slice(0, 10);
        const month = formattedDate.slice(5, 7);
        const day = formattedDate.slice(8, 10);
        const year = formattedDate.slice(0, 4);
        const eventDate = `${month}-${day}-${year}`;
        return eventDate
    }

    return (

        <div className="project-list">
            {projects.length > 0 ? projects.map((project) => {
                return (
                    <div key={project.id}> 
                        <span>{project.title}</span>
                        <span>{showDueDate(project.due_date)}</span>
                    </div>
                )
            }) : null}
        </div>

    )


}

export default ProjectList