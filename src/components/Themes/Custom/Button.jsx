/*
    Custom button component with loading state and custom styles
*/
import {LoadingButton} from "@mui/lab";
import React from "react";

export default function CustomButton({ children, loading, disabled, ...rest }) {
  return (
    <LoadingButton
      loading={loading}
      disabled={disabled}
      variant={"contained"}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
}
