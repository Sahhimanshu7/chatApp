import './Search.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';

const Search = () =>{
    const [APIData, setAPIData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    useEffect(() => {
        try {
            axios.get(`/api/userinfo/get-user/:${searchInput}`)
            .then((response) => {
                setAPIData(response.data);
            })
        } catch (error) {
            console.log(error);
        }
        
    }, [searchInput]);
    console.log(APIData);
    return(
        <div className = "search-box-friends">
            <div className="search-box">
                <input type="text" name="keyword" placeholder="Search chat"
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
            <div className='show-friends-cards'>
            <Card.Group itemsPerRow={3} className='cards'>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card className='i-card'>
                                <Card.Content className='c-card'>
                                    <img src={item.profilePicture} alt='pp' />
                                    
                                    <Card.Description>
                                    <h1>{item.username}</h1>
                                      <p>  {item.email}</p>
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

export default Search;