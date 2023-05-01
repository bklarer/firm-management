import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { dateHelper } from "../../helpers/dateTime";

const ProjectList = () => {
  const projects = useSelector((state) => state.projects.projects);
  const [dropdown, setDropdown] = useState("all");

  let date = new Date().toISOString();

  const filteredProjects = () => {
    let newProjects = [];
    if (projects.length > 0) {
      switch (dropdown) {
        case "not_completed":
          newProjects = projects.filter(
            (project) => project.completed === false
          );
          break;
        case "past_due":
          newProjects = projects.filter(
            (project) => project.completed === false && project.due_date < date
          );
          break;
        case "completed":
          newProjects = projects.filter(
            (project) => project.completed === true
          );
          break;
        default:
          newProjects = projects;
      }
    }
    return newProjects;
  };

  return (
    <>
      <div className="project-filter">
        <select onChange={(e) => setDropdown(e.target.value)} value={dropdown}>
          <option default value="all">
            All
          </option>
          <option value="not_completed">Not complete</option>
          <option value="past_due">Past Due</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="project-list">
        <h2>Projects</h2>
        {projects.length > 0
          ? filteredProjects().map((project) => {
              return (
                <NavLink
                  className="link project-card"
                  key={project.id}
                  to={`/projects/${project.id}`}
                >
                  <div className="data-container">
                    <span>{project.title}</span>
                    <span>{dateHelper(project.due_date)}</span>
                  </div>
                </NavLink>
              );
            })
          : null}
      </div>
    </>
  );
};

export default ProjectList;
