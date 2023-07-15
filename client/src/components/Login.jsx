import './Login.css'

function Login(){
    return(
        <div className="login-window">
            
            <form className="login-form" onSubmit={handleSubmit}>    
                <h1 className="login-head">Login</h1>
                <input type="text" name="username" placeholder="username" required/>
                <input type="password" name="password" placeholder="password" required/>
                <button type="submit" className="login-button">Login</button>
            </form>
            <button className="create-new-account">Create new account</button>
        </div>
    )
}

export default Login;