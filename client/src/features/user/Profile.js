import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";



const Profile = () => {
    const { userInfo } = useSelector((state) => state.login);


    return(

        <div className="profile">
            <img src={userInfo.image} alt="Profile" style={{"width": "200px"}}/>
            <p>{`Username: ${userInfo.username}`}</p>
            <p>{`Name: ${userInfo.first_name} ${userInfo.last_name}`}</p>
            <p>{`email: ${userInfo.email}`}</p>
            <div className="buttons">
                <button><Link to="edit">Edit</Link></button>
            </div>
        </div>
    )
}



export default Profile