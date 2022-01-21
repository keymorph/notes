/*
    Custom button component with loading state and custom styles
*/
import React from "react";
import { Button, CircularProgress } from "@mui/material";

export default function CustomButton({ children, loading, ...rest }) {
  console.log(loading);
  return (
    <Button {...rest}>
      {loading ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        children
      )}
    </Button>
  );
}
