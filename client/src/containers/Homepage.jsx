import './Homepage.css'
import Login from "../components/Login";        // Contains both login and register
import Logo from "../components/Logo";      // Just the logo with text

function Homepage(){
    return(<div className="homepage">
        <Logo />
        <Login />
    </div>)
}

export default Homepage;