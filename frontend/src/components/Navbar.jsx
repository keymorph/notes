import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ThemeToggleSwitch} from "./UI/Theme";
import {Avatar, Card, CardMedia} from "@mui/material";

const pages = ["Main Site", "Polywidget", "TaskHorse"];

const ResponsiveAppBar = (props) => {
  return (
    <AppBar position="static">
      <Container disableGutters>
        <Toolbar disableGutters>
          <Card>
            <CardMedia
                component="img"
                height="70"
                image="https://avatars.githubusercontent.com/u/87445501"
                alt="FourScript Logo"
            />
          </Card>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 5, display: { xs: "flex", md: "none" } }}
          >
            <CardMedia src={"https://avatars.githubusercontent.com/u/87445501"}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <ThemeToggleSwitch sx={{ m: 1 }} defaultChecked={props.darkMode} onClick={props.handleDarkModeToggle} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
