import React from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookie from 'universal-cookie';

import ChannelContainer from './components/ChannelContainer';
import ChannelListContainer from './components/ChannelListContainer';

const apikey = 'ra4zkvzdartn';

const client =  StreamChat.getInstance(apikey);


const App = () => {
  return (
    <div className='App__Wrapper'>
        <Chat client={client} theme={'messaging light'}>

            <ChannelContainer />
            <ChannelListContainer />
        </Chat>
    </div>
  );
};

export default App;
