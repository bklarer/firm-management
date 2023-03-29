import Contact from "./Contact";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { fetchUsers } from "../../slices/userSlice";
import { NavLink } from "react-router-dom";

const ContactList = () => {
        
    const contacts = useSelector((state) => state.users.users);
    const { userInfo } = useSelector((state) => state.login);
    const tasks = useSelector((state) => state.tasks.tasks);
    const currentUser = contacts.length > 0 ? contacts.find((contact) => contact.id === userInfo.id) : {}
    const filteredContacts = contacts.length > 0 ? contacts.filter((contact) => contact.id !== userInfo.id) : []

    


    return(


        <div className="contact-list">
            <div className="contact">
                <h4 className="name">Name</h4>
                <h4>Tasks</h4>
            </div>
            <NavLink className="link" to="/">
                <div className="contact">
                    <h4 className="name">Firm's Tasks</h4>
                    <h4 className="to-do">{tasks.length}</h4>
                </div>
            </NavLink>
                <Contact contact={currentUser}/>

            {filteredContacts.length > 0 ? filteredContacts.map((contact) => {
                return (

                    <Contact key={contact.id} contact={contact}/>

                )}): null}
            
        </div>


    )



}

export default ContactList;