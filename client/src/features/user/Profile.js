import { useSelector, useDispatch } from "react-redux";



const Profile = () => {
    const { userInfo } = useSelector((state) => state.login);


    return(

        <div>
            <p>Picture</p>
            <p>{`Username: ${userInfo.username}`}</p>
            <p>{`Name: ${userInfo.first_name} ${userInfo.last_name}`}</p>
            <p>{`email: ${userInfo.email}`}</p>
        </div>
    )
}



export default Profile