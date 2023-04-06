import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Contact = ({ contact }) => {
  const { userInfo } = useSelector((state) => state.login);
  const assignments = useSelector((state) => state.assignments.assignments);
  const tasks = useSelector((state) => state.tasks.tasks);

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
    <NavLink className="link" to={`/user/${contact.id}`}>
      <div className="contact">
        <h4 className="name">{name}</h4>
        <h4 className="to-do">{userTasks ? userTasks.length : null}</h4>
      </div>
    </NavLink>
  );
};

export default Contact;
