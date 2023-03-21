import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/loginSlice";


const SignUp = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
        // featured_image: ""
    })


    const handleImageChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.files[0]
    })}

    const handleInputChange = (e) => {
        setFormData((formData) => ({...formData, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(registerUser(formData));
        setFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            password_confirmation: ""
            // featured_image: ""
        });}

    return(

        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <input onChange={handleInputChange} name="first_name" value={formData.first_name} type="text" placeholder="First Name"/>
            <input onChange={handleInputChange} name="last_name" value={formData.last_name} type="text" placeholder="Last Name"/>
            <input onChange={handleInputChange} name="username" value={formData.username} type="text" placeholder="Username"/>
            <input onChange={handleInputChange} name="email" value={formData.email} type="email" placeholder="Email"/>
            <input onChange={handleInputChange} name="password" value={formData.password} type="password" placeholder="Password"/>
            <input onChange={handleInputChange} name="password_confirmation" value={formData.password_confirmation} type="password" placeholder="Confirm Password"/>
            {/* <input onChange={handleImageChange} value={formData.featured_image}  name="featured_image" type="file" accept="image/*" multiple={false} /> */}
            <input type="submit" />
        </form>



    )



}

export default SignUp