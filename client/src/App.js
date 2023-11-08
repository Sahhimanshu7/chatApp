import './App.css';
import Homepage from './containers/Homepage';   // The first page the user is directed to if not logged in or signed up i.e. log in/sign up page.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Homepage />} />
          <Route path = '/register' element = {<Register />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
