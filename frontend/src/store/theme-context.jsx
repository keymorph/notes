/*
    Store the theme context for component styling

    MUI createTheme might have a better way of doing this so this is just a quick fix
*/

import React from "react";

const ThemeContext = React.createContext("dark");

export default ThemeContext;
