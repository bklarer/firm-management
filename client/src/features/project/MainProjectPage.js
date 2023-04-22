import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const MainProjectPage = () => {
  const projects = useSelector((state) => state.projects.projects);
  const navigate = useNavigate();

  useEffect(() => {
    if (projects.length > 0) {
      navigate(`/projects/${projects[0].id}`);
    }
  }, [projects, navigate]);

  return (
    <div className="main-project-page">
      Create a new project to show projects
      <ul className="single-button">
        <NavLink className="project-link" to="/projects/new">
          <li>New Project</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default MainProjectPage;
