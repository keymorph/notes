import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from './routes/Login/LoginBox/LoginPage';
import Dashboard from './routes/Dashboard/Dashboard';
import RegisterBox from './routes/Login/Register/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/register' element={<RegisterBox/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
       
      </Routes>
    </Router>
  );
}

export default App;