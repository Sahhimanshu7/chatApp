import './Login.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';

import axios from 'axios';

const Register = () =>{
    
    const {register,handleSubmit} = useForm();
    const [nextClicked, setNextClicked] = useState(false);

    const onSubmit = async(e) =>{
        console.log("Hello");
        // Make a post request to the /api/auth/register
        const username = e.username;
        const password = e.password;
        const firstName = e.firstname;
        const lastName = e.lastname;
        const about = e.about;
        const organization = e.organization;
        const position = e.position;
        const hobbies = e.hobbies;
        const location = e.location;

        await axios.post("/api/auth/register", {
            username : username,
            password : password,
            firstName: firstName,
            lastName: lastName,
            location: location,
            about: about,
            organization: organization,
            position: position,
            hobbies: hobbies
        })
        .then((response) => {
            console.log(response.data);
            // navigate('/');
        }).catch(e => {
            console.log(e);
        });
    }
    return(
        <div className="login-window">
            
            <form onSubmit={handleSubmit(onSubmit)} className="login-form" >    
                <h1 className="login-head">Register</h1>
                { nextClicked ? <>
                <div className='register-leftside'>
                    <input 
                {...register("firstname",
                { required:"Please enter your first name"})}
                type="text" name="firstname" placeholder="firstname" />
                <input 
                {...register("lastname",
                { required:"Please enter your user name"})}
                type="text" name="lastname" placeholder="lastname" />
                <input 
                {...register("about")}
                type="text" name="about" placeholder="About" />
                </div>
                <input 
                {...register("organization")}
                type="text" name="organization" placeholder="organization" />
                <input 
                {...register("location",
                { required:"Please enter your location"})}
                type="text" name="location" placeholder="location" />
                <input 
                {...register("position")}
                type="text" name="position" placeholder="position" />
                <input 
                {...register("hobbies")}
                type="text" name="hobbies" placeholder="hobbies" />
                <input type="submit" value="Register" className="login-button"/>
                </> : ' '}
                { nextClicked? " " :<>
                <input 
                {...register("username",
                { required:"Please enter your user name"})}
                type="text" name="username" placeholder="username" />
                <input 
                {...register("password",
                {required:"Please enter your password."})}
                type="password" name="password" placeholder="password" />
                <button onClick={e =>{
                    setNextClicked(true);
                }}>Next</button>
                </>}
                
            </form>
        </div>
    )
}  

export default Register;