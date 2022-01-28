import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

import companyLogo from "../images/user.svg";
import socialMediaLinks from "../images/link.svg";
import donateButton from "../images/donate.svg";
import informationIcon from "../images/help.svg";
import userProfileImage from "../images/user.svg";
import LinkIcon from "@mui/icons-material/Link";

export default function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div id="4S_logo">
            <img src={companyLogo} alt="FourScript Logo" />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            NOTES
          </Typography>
          <div className="contents">
            <div id="link">
              <a href="#Social TAG">
                <img src={LinkIcon} alt="" />{" "}
              </a>
            </div>

            <div id="donate">
              <a
                href="https://www.buymeacoffee.com/FourScript"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img src={donateButton} alt="" />{" "}
              </a>
            </div>

            <div id="help">
              <a href="#Help Link">
                <img src={informationIcon} alt="" />
              </a>
            </div>

            <div id="help">
              <a href="#Help Link">
                <img src={userProfileImage} alt="" />
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
