import './Homepage.css'
import Login from "../components/Login";        // Contains both login and register
import Logo from "../components/Logo";      // Just the logo with text
import ChatPage from "../containers/ChatPage.jsx";

// Redux state management
import { useSelector } from "react-redux";
import { loggInUser } from "../reduxFeatures/user.jsx";

function Homepage(){
    const {loggedIn, isLoading} = useSelector((store) => store.user);

    console.log(loggedIn);

    return(<div className="homepage">
        {loggedIn ? 
        <ChatPage />
            :
        <>
            <Logo />
            <Login />
        </>
        }
    </div>)
}

export default Homepage;
