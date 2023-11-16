import './Search2.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';

// Redux import 
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from '../reduxFeatures/chat.jsx';


const SearchLeft = () =>{
    const [APIData, setAPIData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const [friendApp, setFriendApp] = useState({});
    const [chatIdApp, setChatIdApp] = useState({});
    const [isSelectedApp, setIsSelectedApp] = useState(false);

    // Redux 
    const dispatch = useDispatch();
    const { friend, chatId, isSelected } = useSelector((store) => store.chat);

    const { user, loggedIn, isLoading } = useSelector((store) => store.user);
    const userID = user._id;
    useEffect(() => {
        try {
            axios.get(`/api/userinfo/get-user-friends/:${searchInput}/${userID}`)
            .then((response) => {
                setAPIData(response.data);
            })
        } catch (error) {
            console.log(error);
        }
        
    }, [searchInput]);
    
    const handleUserClick = async(e) =>{
        console.log(e);
        const userId = e;
        await axios.get(`/api/userinfo/get-user-data/${userId}` ) 
        .then((res) => {
            setFriendApp(res.data);
        })
        .catch(err => console.log(err))

        setIsSelectedApp(true);
        
        await axios.post(`/api/chatapp/getchat/`,{
            id: userID,
            friendid: e   
        })
        .then((res)=>{
            setChatIdApp(res.data)
        })
        .catch((err) =>{
            console.log(err);
        })

        setIsSelectedApp(true)
    } 

    useEffect(()=>{
        
        dispatch(selectChat({friendApp, chatIdApp, isSelectedApp}));
        
    },[friendApp, chatIdApp, isSelectedApp]);

    return(
        <div className = "searchLeft-box-friends">
            <div className="searchLeft-box">
                <input type="text" name="keyword" placeholder="Search Friends"
                onChange={(e) => {
                    setSearchInput(e.target.value);
                    if(e.target.value !== ''){
                    const filteredData = APIData.filter((item) =>{
                        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
                    })
                    setFilteredResults(filteredData);
                }else{
                    setFilteredResults(APIData);
                }
                }}
                />
            </div>
            <div className='showLeft-friends-cards'>
            <Card.Group itemsPerRow={0} className='cards left'>
                {searchInput.length > 1 ? (
                    filteredResults.map((item,index=1) => {
                        index = index + 1;
                        return (
                            <Card className='i-card'>   
                                <Card.Content className='c-card'>                                  
                                    <img src={item.profilePicture} alt='pp' />                        
                                    <Card.Description>
                                    <button key={index} onClick={()=>handleUserClick(item._id)} className='big-button'>
                                      <h1>{item.username}</h1>
                                      <p>  {item.email}</p>
                                      </button>
                                    </Card.Description>
                                </Card.Content>             
                            </Card> 
                        )
                    })
                ) :
                    " "
                }
            </Card.Group>
            </div>
        </div>
    )
}

export default SearchLeft;