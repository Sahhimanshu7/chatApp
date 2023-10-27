import React from 'react';
import './RightSide.css';
import back from '../dummy images/arrow.svg';
import audio from '../dummy images/audio.png';
import video from '../dummy images/video.png';

import photo from '../dummy images/back.JPG';

export default function RightSide({id}) {
    console.log(id);
    // display the chat 
    // design the header body and footer 

    // Object will be passed down from the parent component
    const user = {
        "name": "Roji Lama",
        "userName": "ijor98"
    }

  return (
    <div className='right-side-comp'>
        <div className='right-comp-header'>
            <div className='right-header-left'>
                <img src={back} alt='' />
                <img src={photo} alt='' />
                <div className='chat-name-display'>
                    <button>
                    <h4>{user.userName}</h4>
                    <p>{user.name}</p>
                    </button>
                </div> 
            </div>
            <div className='right-header-right'>
                <button>
                    <img src={audio} alt='' />
                </button>
                <button>
                    <img src={video} alt='' />
                </button>
            </div>
        </div>
        <div className='right-body'>

        </div>
        <div className='right-footer'>
            <form>
                <input name='message' value='message' placeholder='Message ... ' />
                <button type='submit'>send</button>
            </form>
        </div>
    </div>
  )
}
