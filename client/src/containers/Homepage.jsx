import './Homepage.css'
import Login from "../components/Login";        // Contains both login and register
import Logo from "../components/Logo";      // Just the logo with text
import ChatPage from "../containers/ChatPage.jsx";
import { useContext } from 'react';
import { LoginContext } from '../LoginContext.jsx';

function Homepage(){
    const loginStatus = useContext(LoginContext);
    
    console.log(loginStatus);

    return(<div className="homepage">
        {loginStatus ?
            <LoginContext.Provider value = {true}>
                <ChatPage />
            </LoginContext.Provider>
            :
            <>
            <Logo />
            <Login />
            </>
        }
    </div>)
}

export default Homepage;
