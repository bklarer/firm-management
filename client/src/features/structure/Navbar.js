import {NavLink} from "react-router-dom"




const Navbar = () => {



    return (

        <nav className="navbar">
            <h1>Firm Management</h1>
            <ul>
                <NavLink className="link" to="/"><li>Home</li></NavLink>
                <NavLink className="link" to="/tasks/new"><li>New Task</li></NavLink>
                <NavLink className="link" to="/profile"><li>Profile</li></NavLink>
                <NavLink className="link" to="/"><li>Projects</li></NavLink>
                <NavLink className="link" to="/"><li>Logout</li></NavLink>
                <NavLink className="link" to="/signup"><li>Sign Up</li></NavLink>
            </ul>
        </nav>


    )


}

export default Navbar;