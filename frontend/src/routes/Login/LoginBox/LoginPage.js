import React from "react";
import "./loginPage.css";
import Header from "../../Header";
import LoginBox from "../LoginBox/LoginBox";
import RegisterBox from "../Register/RegisterPage";

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