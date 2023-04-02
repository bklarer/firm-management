import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const Contact = ({contact}) => {
    const { userInfo } = useSelector((state) => state.login);
    console.log("contact", contact)
    const name = userInfo || userInfo.id === contact.id ? "My Tasks" : `${contact.first_name} ${contact.last_name}`
    
    return (
        <NavLink className="link" to={`/user/${contact.id}`}>
            <div className="contact">
                <h4 className="name">{name}</h4>
                <h4 className="to-do">{contact.tasks ? contact.tasks.length : null}</h4>
            </div>
        </NavLink>
        


    )



}

export default Contact;