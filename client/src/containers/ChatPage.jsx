import Search from '../components/Search';
import './ChatPage.css';
import photo from '../dummy images/back.JPG'  // To be retrived from database
import RightSide from '../components/RightSide';    // Contains the chat box
import SearchLeft from '../components/Search2';     // To search for the friends who are in the friendlist and can communicate with

function ChatPage(){
    const chatID = 1234; // TO be loaded from database later
    return (
        <div className="chat-page">
            <div className="header">
                <div className = "logo">Chat App</div>
                <Search />
                <div className = "profile-img">
                    <button>
                        <img src = {photo} alt = " " />
                    </button>
                </div>
            </div>
            <div className = "body">
                {/* Divide the body into two parts for desktop => leftside and right side; for mobile use left as top and right as buttom; */}
                <div className = "left-side">
                    <SearchLeft />
                </div>
                <div className = "right-side">
                   <RightSide id={chatID}/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;