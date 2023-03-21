import {NavLink} from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";




const Navbar = () => {
    const [userInfo, setUserInfo] = useState()
    
    if(!userInfo) {
        return(
            <nav className="navbar">
                <h1>Firm Management</h1>
                <ul>
                <NavLink className="link" to="/signup"><li>Sign Up</li></NavLink>
                <NavLink className="link" to="/"><li>Login</li></NavLink>
                </ul>
            </nav>
        )
    }

    return (

        <nav className="navbar">
            <h1>Firm Management</h1>
            <ul>
                
                <NavLink className="link" to="/"><li>Home</li></NavLink>
                <NavLink className="link" to="/tasks/new"><li>New Task</li></NavLink>
                <NavLink className="link" to="/profile"><li>Profile</li></NavLink>
                <NavLink className="link" to="/"><li>Projects</li></NavLink>
                <NavLink className="link" to="/"><li>Logout</li></NavLink>
            </ul>
        </nav>


    )


}

export default Navbar;