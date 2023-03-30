import { useSelector} from "react-redux";

const ProjectList = () => {
    const projects = useSelector((state) => state.projects.projects);



    return (

        <div>
            {projects.length > 0 ? projects.map((project) => {
                return (
                    <div> 
                        <span>{project.title}</span>
                    </div>
                )
            }) : null}
        </div>

    )


}

export default ProjectList