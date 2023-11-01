import './App.css';
import Homepage from './containers/Homepage';   // The first page the user is directed to if not logged in or signed up i.e. log in/sign up page.

function App() {
  return (
    <div className="App">  
      <Homepage />
    </div>
  );
}

export default App;
