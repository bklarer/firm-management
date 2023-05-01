import Contact from "./Contact";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../slices/userSlice";
import { NavLink } from "react-router-dom";

const ContactList = () => {
  const contacts = useSelector((state) => state.users.users);
  const { userInfo } = useSelector((state) => state.login);
  const tasks = useSelector((state) => state.tasks.tasks);
  const currentUser =
    contacts.length > 0
      ? contacts.find((contact) => contact.id === userInfo.id)
      : {};
  const filteredContacts =
    contacts.length > 0
      ? contacts.filter((contact) => contact.id !== userInfo.id)
      : [];

  const sortedContacts = filteredContacts ? filteredContacts.sort((a, b) => {
    return a.first_name.localeCompare(b.name)}) : null;


  const firmImage =
    "https://res.cloudinary.com/dnahj1ggn/image/upload/v1681615804/firm-management-firm_1_ydfurw.jpg";

  return (
    <div className="contact-list">
        <h2>Contacts</h2>
      <NavLink className="contact-card-link link" to={`/`}>
        <div className="contact-card">
          <div className="middle-container">
            <div className="image-container">
              <img src={firmImage} alt="profile" />
            </div>
            <div className="task-number">
              <h3>Tasks</h3>
              <h3>{tasks ? tasks.length : "none"}</h3>
            </div>
          </div>
          <h3>Firm's Tasks</h3>
        </div>
      </NavLink>
      <Contact contact={currentUser} />

      {sortedContacts.length > 0
        ? sortedContacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />;
          })
        : null}
    </div>
  );
};

export default ContactList;
