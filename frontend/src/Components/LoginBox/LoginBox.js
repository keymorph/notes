import React,{useState} from "react";
import Header from "../Header/Header";
import userImage from "../../images/user.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginBox() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const userLogin = async (event) => {
    event.preventDefault();
    
    const data = {
      email: email,
      password: password
    };

    axios.get(
      "http://localhost:5000/api/login",
      data,
    ).then((res) => {
      console.log("Entered Res")
      console.log(res)
      localStorage.setItem("auth-token", res.data.accessToken);
    }).catch((error) => {
      console.log("Entered Error")
      console.log(error);
    }); 
  };
  
  return (
    <div className="innerBox">
      <div id="userImage">
        <img src={userImage} alt="JotFox Image" />
      </div>
      <h4> Welcome to </h4>
      <h3>JotFox</h3>

      <form onSubmit={userLogin}>
        <label htmlFor="Email" className="Email">
          Email
          <br/>
          <input
            type="text"
            placeholder="JohnDoe@gmail.com"
            required
            onChange={(event) => setEmail(event.target.value)}
          />{" "}
          <br />
        </label>

        <label htmlFor="Password" className="Password">
          Password
          <br />
          <input
            type="text"
            placeholder="••••••••"
            required
            onChange={(event) => setPassword(event.target.value)}
          />{" "}
          <br />
        </label>
        
        <label htmlFor="Remember Me" id="Remember">
          <input type="checkbox" />
          Remember Me <br/>
        </label>
    
        <button type="submit" id="login">Login</button>

        <a href="default.asp">
          <p>Forgot Password?</p>
        </a>
      </form>
    </div>
  );
}

export default LoginBox;