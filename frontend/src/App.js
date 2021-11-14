import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from './Components/Header/Header';

import LoginPage from './routes/LoginPage/LoginPage';
import Dashboard from './routes/Dashboard/Dashboard';
import RegisterBox from './Components/RegisterBox/RegisterBox';

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
