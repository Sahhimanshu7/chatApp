import './Register.css'
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from '../reduxFeatures/user.jsx';

const Register = () =>{

    const navigate = useNavigate();
    
    const {register,handleSubmit} = useForm();
    const [nextClicked, setNextClicked] = useState(false);

    const [userApp, setUserApp] = useState({});
    
    const [payload, setPayload] = useState({});

    const [isloggedIn, setIsLoggedIn] = useState(false);

    // Redux 
    const dispatch = useDispatch();
    const { user, loggedIn, isLoading } = useSelector((store) => store.user);
    console.log(user, loggedIn, isLoading);

    const onSubmit = async(e) =>{
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
        const email = e.email;

        await axios.post("/api/auth/register", {
            username : username,
            password : password,
            firstName: firstName,
            lastName: lastName,
            location: location,
            about: about,
            organization: organization,
            position: position,
            hobbies: hobbies,
            email:email
        })
        .then((response) => {
            const responseToSend = response.data;
            setUserApp(response.data);
            setIsLoggedIn(true);
            navigate('/');
        }).catch(e => {
            console.log(e);
        });
    }

   useEffect(()=>{
        dispatch(logInUser({userApp, isloggedIn}));
    },[userApp]);

    return(
        <div className = "register-main">
        <Logo />
        <div className="register-window">
            
            <form onSubmit={handleSubmit(onSubmit)} className="register-form" >    
                <h1 className="register-head">Register</h1>
                { nextClicked ? <>
                
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
                <input 
                {...register("firstname",
                { required:"Please enter your first name"})}
                type="text" name="firstname" placeholder="Firstname" />
                <input 
                {...register("lastname",
                { required:"Please enter your user name"})}
                type="text" name="lastname" placeholder="Lastname" />
                        <input 
                {...register("email",
                            {required:"Please enter your email"})} type = "email" name = "email" placeholder = "email" />       
               

                <button onClick={e =>{
                    setNextClicked(true);
                }}>Next</button>
                </>}
                
            </form>
        </div>
        </div>
    )
}  

export default Register;
