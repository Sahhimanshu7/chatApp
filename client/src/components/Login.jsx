import './Login.css'    // importing css file 
import { useForm } from "react-hook-form";
import axios from 'axios';

import { useEffect, useState } from 'react';
// To login user (The main page)
// And to give users the option to sign up

// Redux import 
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from '../reduxFeatures/user.jsx';

const Login = () =>{ 
    const {register,handleSubmit} = useForm();    // To handle form changes
    const [appUser, setAppUser] = useState(null);

    // Redux 
    const dispatch = useDispatch();
    const { user, loggedIn, isLoading } = useSelector((store) => store.user);
    console.log(user);
    
    const onSubmit = async(e) =>{
        // Make a post request to the /api/auth/login
        const username = e.username;
        const password = e.password;

        await axios.post("/api/auth/login", {
            username : username,
            password : password
        })
        .then((response) => {
            console.log(response);
            setAppUser(response.data);
        }).catch(e => {
            console.log("Error in login:", e);
        });
    }
    useEffect(() => {
        dispatch(logInUser(appUser));
        console.log(appUser);
    }, [appUser]);
    return(
        // Login-window to contain the login box
        // Also a button to redirect to the register
        
        <div className="login-window"> 
            <form onSubmit={handleSubmit(onSubmit)} className="login-form" >    
                <h1 className="login-head">Login</h1>
                <input 
                {...register("username",
                { required:"Please enter your user name"})}
                type="text" name="username" placeholder="username" />
                <input 
                {...register("password",
                {required:"Please enter your password."})}
                type="password" name="password" placeholder="password" />
                <input type="submit" value="Login" className="login-button"/>
            </form>
            <button className = "register-link-button">Register Instead ?</button>    {/*This button directs to register a new account page*/} 
        </div>
    )
}  

export default Login;
