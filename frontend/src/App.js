import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from './routes/LoginPage/LoginPage';
import RegisterPage from './routes/RegisterPage/RegisterPage';
import Dashboard from './routes/Dashboard/Dashboard';


function App() {
  return (
    <Router>
      <Routes>

        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/register' element={<RegisterPage/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
       
      </Routes>
    </Router>
  );
}

export default App;
