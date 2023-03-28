import { Outlet } from "react-router-dom"
import ContactList from "../user/ContactList"


const LeftBar = () => {


    return (

        <div className="left-bar">
            <Outlet/>
        </div>


    )


}

export default LeftBar