import { Outlet } from "react-router-dom"
import ContactList from "../user/ContactList"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { fetchTasks } from "../../slices/taskSlice";

const LeftBar = () => {



    return (

        <div className="left-bar">
            <Outlet/>
        </div>


    )


}

export default LeftBar