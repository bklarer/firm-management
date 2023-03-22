const EditTask = () => {



    return (

    //create state for form
    //pull state to input into form
    //create fetch to submit form
    //update state in task slice

    <form className="edit-task">
        <input placeholder="Title"/>
        <input type="textera" placeholder="Notes"/>
        <input placeholder="Created At"/>
        <label>
            Due Date: {" "}
        <input type="date" />
        </label>
        <select>
            <option>Assigned</option>
        </select>
        <input placeholder="Created By"/>
        <label>
            Project?
            <input type="checkbox"/>
        </label>
        <select>
            <option>Projects</option>
        </select>
        <input type="submit"/>
    </form>


    )




}

export default EditTask