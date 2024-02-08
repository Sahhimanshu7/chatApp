import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import  Register  from "./components/accounts/Register";
import './App.css';
import Header from './components/layouts/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/register' element = {<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
