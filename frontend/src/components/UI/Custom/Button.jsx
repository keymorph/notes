/*
    Custom button component with loading state and custom styles
*/
import React from "react";
import {LoadingButton} from "@mui/lab";

export default function CustomButton({ children, loading, disabled, ...rest }) {
  return (
      <LoadingButton loading={loading} disabled={disabled} variant={"contained"} {...rest}>
        {children}
      </LoadingButton>
  );
}
