import {Link} from "react-router-dom"




const Navbar = () => {



    return (

        <nav className="navbar">
            <h1>Firm Management</h1>
            <ul>
                <Link className="link" to="/"><li>Home</li></Link>
                <Link className="link" to="/tasks/new"><li>New Task</li></Link>
                <Link className="link" to="/profile"><li>Profile</li></Link>
                <Link className="link" to="/"><li>Projects</li></Link>
                <Link className="link" to="/"><li>Logout</li></Link>
                <Link className="link" to="/signup"><li>Sign Up</li></Link>
            </ul>
        </nav>


    )


}

export default Navbar;