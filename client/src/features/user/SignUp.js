import {useState} from "react"




const SignUp = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirm_password: "",
        featured_image: null
    })


    const handleImageChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.files[0]
    })}


    return(

        <form>
            <input placeholder="First Name"/>
            <input placeholder="Last Name"/>
            <input placeholder="Username"/>
            <input placeholder="Email"/>
            <input placeholder="Password"/>
            <input placeholder="Confirm Password"/>
            <input name="featured_image" type="file" accept="image/*" multiple={false} />
            <input type="submit" />


        </form>



    )



}

export default SignUp