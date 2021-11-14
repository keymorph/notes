import React from "react";
import "./loginPage.css";
import Header from "../../Components/Header/Header";
import LoginBox from "../../Components/LoginBox/LoginBox";
import RegisterBox from "../../Components/RegisterBox/RegisterBox";

/* 
  Login Page
  > Container
    > Header        ---------------------
    > Content        [       []        ]
      > WideBox
        > LoginBox
        > RegisterBox
*/

function LoginPage() {
    return (
        <div className="container">
            <Header/>
            <LoginBox/>
            <RegisterBox/>
        </div>
    );
}

export default LoginPage;
