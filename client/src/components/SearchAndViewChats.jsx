import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { AccountCircle } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import _ from 'lodash';

const SearchAndViewChats = () => {
  const { currentUser, setCurrentChat } = useAuth();

  const [foundUsers, setFoundUsers] = useState();
  const [viewMessages, setViewMessages] = useState(true);
  const [chatrooms, setChatRooms] = useState([]); 

  const [friends, setfriends] = useState([]);

  let chatFriends = [];

  useEffect(() => {
    const getChatRooms = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/room/${currentUser._id}`,
      );
      setChatRooms(res.data);
      
    };
    getChatRooms();
    
  }, []);
  
  useEffect(() => {
    chatrooms.map((chat) => {
      chat.members.forEach((ids) => {
        if (ids != currentUser._id) {
          chatFriends.push(ids);
        }
      })
    })

    const getFriends = () => {
      chatFriends.map(async (ids) => {
        await axios.post("http://localhost:8080/api/user/get-user", {
          id: ids
        }).then((res) => {
          let f = friends.filter((item) => item !== res.data.user)
          setfriends((f) => (_.uniq([...f, res.data.user])));
        })
        .catch(err => console.log(err))
      })
    }
    if(chatFriends.length > friends.length) getFriends();
  }, [chatrooms])

  const handleChange = async (value) => {
    setViewMessages(false);
    await axios
      .get(`http://localhost:8080/api/user/get-users?name=${value}`)
      .then((response) => setFoundUsers(response.data))
      .catch((error) => console.log(error));
  };


  const createChat = async (user) => {
    if (currentUser._id === user._id) return;

    // search to see if the conversation exists already before creating a new one.

    const chat = await axios.get(
      `http://localhost:8080/api/room/${currentUser._id}/:{user._id}`,
    );
    if (chat.data._id) {
      setCurrentChat(chat.data._id);
      return;
    }
    console.log(user)
    await axios
      .post("http://localhost:8080/api/room", {
        senderId: currentUser._id,
        receiverId: user._id,
      })
      .then((response) => {
        // setChatRooms([...chatrooms, response.data._id]);
        console.log(response)
        setCurrentChat(response.data._id);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="md:w-[30vw] h-[87vh] border-solid border-2 border-blue-950 p-4 m-4 rounded-2xl">
      <div className="flex justify-center items-center space-x-2">
        {!viewMessages && (
          <button onClick={() => setViewMessages(!viewMessages)}>
            <CloseIcon sx={{ color: "white", fontSize: 30 }} />
          </button>
        )}
        <input
          type="text"
          id="search"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search..."
          className="bg-black text-white font-mono w-full h-[40px] rounded-3xl outline-none p-4"
        />
        {!viewMessages && <SendIcon sx={{ color: "white", fontSize: 30 }} />}
      </div>
      <div>
      {viewMessages ?( 
      <div>
        {
              friends.map((users, index) => (
                <button
                  key={index}
                  className="flex flex-col justify-center w-full"
                  onClick={() => {
                    createChat(users);
                  }}
                >
                  <div className="flex space-x-4 my-2 bg-gray-700 md:w-[25vw] self-center p-2 rounded-3xl">
                    <div>
                      {users.ProfileImage ? (
                        <img src={users.ProfileImage} alt="Not found" />
                      ) : (
                        <AccountCircle sx={{ color: "white", fontSize: 36 }} />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-left">@{users.username}</p>
                      <p className="text-white">{users.email}</p>
                    </div>
                  </div>
                </button>
              ))}
      </div>  
        ) : (
          <div>
            {foundUsers &&
              foundUsers.map((users, index) => (
                <button
                  key={index}
                  className="flex flex-col justify-center w-full"
                  onClick={() => { 
                    createChat(users);
                    setViewMessages(!viewMessages);
                  }}
                >
                  <div className="flex space-x-4 my-2 bg-gray-700 md:w-[25vw] self-center p-2 rounded-3xl">
                    <div>
                      {users.ProfileImage ? (
                        <img src={users.ProfileImage} alt="Not found" />
                      ) : (
                        <AccountCircle sx={{ color: "white", fontSize: 36 }} />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-left">@{users.username}</p>
                      <p className="text-white">{users.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            ;
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndViewChats;
