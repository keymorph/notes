/*
    Custom button component with loading state and custom styles
*/
import React from "react";
import { Button, CircularProgress } from "@mui/material";

export default function CustomButton({ children, loading, disabled, ...rest }) {
  return (
    <Button disabled={loading || disabled} {...rest}>
      {loading ? <CircularProgress size={20} /> : children}
    </Button>
  );
}
