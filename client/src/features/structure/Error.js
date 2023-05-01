import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const Error = () => {
  const loginErrors = useSelector((state) => state.login.error);
  const assignmentErrors = useSelector((state) => state.assignments.error);
  const projectErrors = useSelector((state) => state.projects.error);
  const userErrors = useSelector((state) => state.users.error);
  const taskErrors = useSelector((state) => state.tasks.error);



  return (
    <div className="error-section">
      <div className="error-container">
        {loginErrors
          ? loginErrors.map((error) => (
              <div key={uuid()} className="error">
                <p >{error}</p>
              </div>
            ))
          : null}
        {assignmentErrors
          ? assignmentErrors.map((error) => (
              <div key={uuid()} className="error">
                <p>{error}</p>
              </div>
            ))
          : null}
        {projectErrors
          ? projectErrors.map((error) => (
              <div key={uuid()} className="error">
                <p>{error}</p>
              </div>
            ))
          : null}
        {userErrors
          ? userErrors.map((error) => (
              <div key={uuid()} className="error">
                <p>{error}</p>
              </div>
            ))
          : null}
        {taskErrors
          ? taskErrors.map((error) => (
              <div key={uuid()} className="error">
                <p>{error}</p>
              </div>
            ))
          : null}
        {/* Test */}
      </div>
    </div>
  );
};

export default Error;
