import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import  Register  from "./components/accounts/Register";
import './App.css';
import Header from './components/layouts/Header';
import ErrorMessage from './components/layouts/ErrorMessage';
import Login from './components/accounts/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ErrorMessage />
        <Routes>
          <Route exact path='/register' element = {<Register />} />
          <Route exact path='/login' element = {<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
