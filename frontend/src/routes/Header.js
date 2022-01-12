import React from "react";
import logoImage from "../images/user.svg";
import linkImage from "../images/link.svg";
import moneyImage from "../images/donate.svg";
import helpImage from "../images/help.svg";

function Header() {
  return (
    <div className="Header">
        
      <div id="4S_logo" alt="4S Logo">
        <img src= {logoImage}/>
      </div>

    <div id="header-title"> NOTES </div>

    <div className="contents">
      <div id="link">
        
       <a href="#Social TAG">< img src={linkImage}/> </a>
      </div>

      <div id="donate">
        
        
        <a href="https://www.buymeacoffee.com/FourScript" target= "_blank"> <img src={moneyImage}/> </a>
      </div>

      <div id="help"> 
        <a href="#Help Link"><img src={helpImage}/></a>
      </div>
    </div>

    </div>
  )
}

export default Header;
