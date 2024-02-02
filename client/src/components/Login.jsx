import './Login.css'    // importing css file 
import { useForm } from "react-hook-form";
import axios from 'axios';

import { Link } from "react-router-dom";
import Loading from './Loading.jsx';
import { useEffect, useState } from 'react';
// To login user (The main page)
// And to give users the option to sign up

// Redux import 
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from '../reduxFeatures/user.jsx';

const Login = () =>{ 
    const {register,handleSubmit} = useForm();    // To handle form changes
    const [userApp, setUserApp] = useState({});
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    // Redux 
    const dispatch = useDispatch();
    const { user, loggedIn, isLoading } = useSelector((store) => store.user);
    
    const onSubmit = async(e) =>{
        setLoadingState(true);
        // Make a post request to the /api/auth/login
        const username = e.username;
        const password = e.password;

        await axios.post("/api/auth/login", {
            username : username,
            password : password
        })
        .then((response) => {
            setUserApp(response.data);
            setIsLoggedIn(true);
            setLoadingState(false);
        }).catch(e => {
            console.log("Error in login:", e);
            setUserNotFound(true);
        });
    }

    useEffect(()=>{
        dispatch(logInUser({ userApp, isloggedIn }));
    },[userApp]);
        
    return(
        // Login-window to contain the login box
        // Also a button to redirect to the register
        <>
        {loadingState ? 
        <Loading /> :
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
            <Link to = "/register">
                {/*This button directs to register a new account page*/}
                <button className = "register-link-button">Register Instead ?</button>     
            </Link>
        </div>

        }

        {userNotFound ? 
        <div className='register-instead'>
        <p>Sorry :( We couldn't find your Account </p>
        <Link to = "/register">
             {/*This button directs to register a new account page*/}
            <button className = "register-link-button">Register Instead ?</button>    
        </Link>
        </div>
    :
    ' '}
        </>
    )
}  

export default Login;
