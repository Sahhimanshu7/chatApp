import './Homepage.css'
import Login from "../components/Login";
import Logo from "../components/Logo";

function Homepage(){
    return(<div className="homepage">
        <Logo />
        <Login />
    </div>)
}

export default Homepage;