import { useSelector } from "react-redux";




const Contact = ({contact}) => {
    const { userInfo } = useSelector((state) => state.login);

    const name = userInfo.id === contact.id ? "My Tasks" : `${contact.first_name} ${contact.last_name}`

    return (

        <div className="contact">
            <h4 className="name">{name}</h4>
            <h4 className="to-do">{contact.tasks.length}</h4>
        </div>
        


    )



}

export default Contact;