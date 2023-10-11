import Search from '../components/Search';
import './ChatPage.css';

function ChatPage(){
    
    return (
        <div className="chat-page">
            <div className="header">
                <div className = "logo">Chat App</div>
                <div className = "profile-img"><img src = "/" alt = " " /></div>
            </div>
            <div className = "body">
                <div className = "left-side">
                    <Search/>
                </div>
                <div className = "right-side">
                   
                </div>
            </div>
        </div>
    )
}

export default ChatPage;