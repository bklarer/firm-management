import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Contact = ({ contact }) => {
  const { userInfo } = useSelector((state) => state.login);
  const name =
    userInfo && userInfo.id === contact.id
      ? "My Tasks"
      : `${contact.first_name} ${contact.last_name}`;
  const taskIds = [];
  const assignments = useSelector(
    (state) => state.assignments.assignments
  ).filter((assignment) => assignment.user_id === contact.id);

  assignments.forEach((assignment) => {
    taskIds.push(assignment.task_id);
  });

  const tasks = useSelector((state) => state.tasks.tasks).filter((task) =>
    taskIds.includes(task.id)
  );

  return (
    <NavLink className="link" to={`/user/${contact.id}`}>
      <div className="contact">
        <h4 className="name">{name}</h4>
        <h4 className="to-do">{tasks ? tasks.length : null}</h4>
      </div>
    </NavLink>
  );
};

export default Contact;
