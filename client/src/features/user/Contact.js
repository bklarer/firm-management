import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Contact = ({ contact }) => {
  const { userInfo } = useSelector((state) => state.login);
  const assignments = useSelector((state) => state.assignments.assignments);
  const tasks = useSelector((state) => state.tasks.tasks);
  const addDefaultSrc = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dnahj1ggn/image/upload/v1681614097/face_sktddp.jpg";
  };

  const imagePlaceholder =
    "https://res.cloudinary.com/dnahj1ggn/image/upload/v1681614097/face_sktddp.jpg";

  if (!contact)
    return (
      <NavLink className="link" to={`/`}>
        <div className="contact">
          <h4 className="name">Loading</h4>
          <h4 className="to-do">0</h4>
        </div>
      </NavLink>
    );

  const name =
    userInfo && userInfo.id === contact.id
      ? "My Tasks"
      : `${contact.first_name} ${contact.last_name}`;
  const taskIds = [];
  const userAssignments = assignments.filter(
    (assignment) => assignment.user_id === contact.id
  );

  userAssignments.forEach((assignment) => {
    taskIds.push(assignment.task_id);
  });

  const userTasks = tasks.filter((task) => taskIds.includes(task.id));

  return (
    <NavLink className="contact-card-link link" to={`/user/${contact.id}`}>
      <div className="contact-card">
        <div className="middle-container">
          <div className="image-container">
            <img
              onError={addDefaultSrc}
              src={contact.image ? contact.image : imagePlaceholder}
              alt="profile"
            />
          </div>
          <div className="task-number">
            <h3>Tasks</h3>
            <h3>{userTasks ? userTasks.length : null}</h3>
          </div>
        </div>
        <h3>{name}</h3>
      </div>
    </NavLink>
  );
};

export default Contact;
