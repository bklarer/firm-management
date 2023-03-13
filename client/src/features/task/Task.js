





const Task = () => {





    return (

        <div className="task-box">
            <div className="checkbox">
                <input
                    className="task-completed"
                    type="checkbox"
                />
            </div>
            <div className="title">Task: Prepare Tax Return</div>
            <div className="project">Project: Project for Bob</div>
            <div className="created">
                <div><u>Created</u></div>
                <div>10-23-23</div>
            </div>
            <div className="date-due">
                <div><u>Due</u></div>
                <div>10-23-23</div>
            </div>
            <div className="assigned">
                <div><u>Assigned</u></div>
                <div>Benjamin Klarer</div>
            </div>
            <div className="created-by">
                <div><u>Created By</u></div>
                <div>Benjamin Klarer</div>
            </div>
            <div className="buttons button1"><button>View</button></div>
            <div className="buttons button2"><button>Edit</button></div>
        </div>
    )


}

export default Task