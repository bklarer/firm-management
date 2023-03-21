




const Contact = ({contact}) => {




    return (

        <div className="contact">
            <h4 className="name">{`${contact.first_name} ${contact.last_name}`}</h4>
            <h4 className="to-do">{contact.tasks.length}</h4>
        </div>
        


    )



}

export default Contact;