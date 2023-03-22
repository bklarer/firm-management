import Contact from "./Contact";
import { useSelector } from "react-redux";



const ContactList = () => {
    const contacts = useSelector((state) => state.users.users);
    const { userInfo } = useSelector((state) => state.login);
    //Should filter out current user ID contact
    const filteredContacts = contacts.length > 0 ? contacts.filter((contact) => contact.id !== userInfo.id) : []

    return(


        <div className="contact-list">
            <div className="contact">
                <h4 className="name">Name</h4>
                <h4>Tasks</h4>
            </div>
            <Contact contact={userInfo}/>
            {filteredContacts.length > 0 ? filteredContacts.map((contact) => {
                return (

                    <Contact key={contact.id} contact={contact}/>

                )}): null}
            
        </div>


    )



}

export default ContactList;