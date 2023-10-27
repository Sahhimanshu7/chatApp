import './Login.css'
import { useForm } from "react-hook-form";

import axios from 'axios';



const Login = () =>{

    const {register,handleSubmit} = useForm();
    const onSubmit = async(e) =>{
        console.log("Hello");
        // Make a post request to the /api/auth/login
        const username = e.username;
        const password = e.password;

        await axios.post("/api/auth/login", {
            username : username,
            password : password
        })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("isLoggedIn", "true");
            window.location.reload();
        }).catch(e => {
            console.log(e);
        });
    }
    return(
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
        </div>
    )
}  

export default Login;