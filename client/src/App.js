import './App.css';
import Homepage from './containers/Homepage';
import ChatPage from './containers/ChatPage';

function App() {
  const loggedInStatus = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
      {loggedInStatus ? 
      <ChatPage />
      :
      <Homepage />
}
    </div>
  );
}

export default App;
