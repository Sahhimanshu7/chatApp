import './App.css';
import Homepage from './containers/Homepage';   // The first page the user is directed to if not logged in or signed up i.e. log in/sign up page.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './containers/ChatPage.jsx';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Homepage />} />
          <Route exact path = '/chat-page/:url' element = {<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
