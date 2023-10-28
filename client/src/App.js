import './App.css';
import Homepage from './containers/Homepage';   // The first page the user is directed to if not logged in or signed up i.e. log in/sign up page.
import ChatPage from './containers/ChatPage';   // The actual chatpage where the application is rendered after user authentication

function App() {
  const loggedInStatus = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
      {/* Check login status and then render the page accordingly. */}
      {loggedInStatus ? 
      <ChatPage />
      :
      <Homepage />
}
    </div>
  );
}

export default App;
