import React, { useState } from "react";
import userImage from "../../../images/user.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
	const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const userRegister = async (event) => {
    event.preventDefault();
    
    const data = {
      email: email,
      password: password
    };

    console.log(data)
    
    axios.post(
      "http://localhost:8000/api/user",
      data,
    ).then((res) => {
      console.log("Entered Res")
      console.log(res)
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

      <h4>REGISTER</h4>

      <form onSubmit={userRegister}>
        <label htmlFor="Email" className="Email">
          Email
          <br />
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

        <button type="submit">Submit</button>
        </form>
    
    </div>
  );
}

export default RegisterPage;
