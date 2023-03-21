import Contact from "./Contact";
import { useSelector } from "react-redux";



const ContactList = () => {
    const contacts = useSelector((state) => state.users.users);

    console.log("contacts", contacts)
    //Should filter out current user ID?

    return(


        <div className="contact-list">
            <div className="contact">
                <h4 className="name">Name</h4>
                <h4>Tasks</h4>
            </div>
            {contacts.map((contact) => {
                return (
                    <>
                    <Contact contact={contact}/>
                    </>
                )})}
            
        </div>


    )



}

export default ContactList;