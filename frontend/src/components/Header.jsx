import logoImage from "../images/user.svg";
import linkImage from "../images/link.svg";
import moneyImage from "../images/donate.svg";
import helpImage from "../images/help.svg";

function NavBar() {
  return (
    <div className="NavBar">
      <div id="4S_logo">
        <img src={logoImage} alt="FourScript Logo" />
      </div>

      <div id="navbar-title"> NOTES </div>

      <div className="contents">
        <div id="link">
          <a href="#Social TAG">
            <img src={linkImage} alt="" />{" "}
          </a>
        </div>

        <div id="donate">
          <a
            href="https://www.buymeacoffee.com/FourScript"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={moneyImage} alt="" />{" "}
          </a>
        </div>

        <div id="help">
          <a href="#Help Link">
            <img src={helpImage} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
