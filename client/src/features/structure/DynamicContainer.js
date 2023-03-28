import { Outlet } from "react-router-dom"
import TaskList from "../task/TaskList"


const DynamicContainer = () => {




    return (


        <div className="dynamic-container">
            <Outlet/>
        </div>


    )


}

export default DynamicContainer