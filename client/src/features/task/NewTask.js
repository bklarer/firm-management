




const NewTask = () => {



    return (

        <form>
            <input placeholder="Title"/>
            <input type="textera" placeholder="Notes"/>
            <input placeholder="Created At"/>
            <input type="date" placeholder="Due on"/>
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
        </form>
    )




}

export default NewTask