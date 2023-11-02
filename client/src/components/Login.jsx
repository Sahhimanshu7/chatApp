import './Login.css'    // importing css file 
import { useForm } from "react-hook-form";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from "../UserContext.jsx";   // Importing userCOntext from declaration 
// To login user (The main page)
// And to give users the option to sign up
// Also update the value using useContext

import { Link } from 'react-router-dom';
import ChatPage from "../containers/ChatPage.jsx";

const Login = () =>{
     const {register,handleSubmit} = useForm();    // To handle form changes
     const [response, setResponse] = useState(null); 
     const onSubmit = async(e) =>{
        // Make a post request to the /api/auth/login
        const username = e.username;
        const password = e.password;

        await axios.post("/api/auth/login", {
            username : username,
            password : password
        })
        .then((response) => {
            console.log(response); //temporary
            setResponse(response.data);
            return <UserContext.Provider value = {response.data}>
              <ChatPage />
            </UserContext.Provider>
        }).catch(e => {
            console.log("Error in login:", e);
        });
    }
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
