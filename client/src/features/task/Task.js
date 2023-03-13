





const Task = () => {





    return (

        <div className="task-box">
            <div className="checkbox">
                <input
                    className="task-completed"
                    type="checkbox"
                />
            </div>
            <div className="title">Task: fhdasjfkhdsajkflhadslkfhdkalsfhdffsadfsdaffsadfdas</div>
            <div className="created">Date Created:</div>
            <div className="date-due">Date Due:</div>
            <div className="assigned">Assigned:</div>
            <div className="created-by">Created By:</div>
            <div className="buttons button1"><button>View</button></div>
            <div className="buttons button2"><button>Edit</button></div>

        </div>
    )


}

export default Task