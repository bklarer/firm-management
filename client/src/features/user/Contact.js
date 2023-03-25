import { useSelector } from "react-redux";




const Contact = ({contact}) => {
    const { userInfo } = useSelector((state) => state.login);

    const name = userInfo.id === contact.id ? "My Tasks" : `${contact.first_name} ${contact.last_name}`
    console.log("actual contact", contact)
    return (

        <div className="contact">
            <h4 className="name">{name}</h4>
            <h4 className="to-do">{contact.tasks ? contact.tasks.length : null}</h4>
        </div>
        


    )



}

export default Contact;