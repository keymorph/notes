import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Card, CardMedia } from "@mui/material";

import { ThemeToggleSwitch} from "./UI/Theme";

const ResponsiveAppBar = ({darkMode, handleDarkModeToggle}) => {
  return (
    <AppBar position="static" sx={{maxHeight: 65}}>
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
          <Card>
            <CardMedia
                component="img"
                height="60"
                image="https://avatars.githubusercontent.com/u/87445501"
                alt="FourScript Logo"
            />
          </Card>
          <ThemeToggleSwitch defaultChecked={darkMode} onClick={handleDarkModeToggle} />
        </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
