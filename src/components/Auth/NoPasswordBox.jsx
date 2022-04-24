import { Box, Link as MUILink, TextField } from "@mui/material";
import Link from "next/link";

import CustomButton from "../Themes/Custom/Button";

export default function NoPasswordBox(props) {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <TextField
        margin="normal"
        sx={{ borderRadius: 100 }}
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={(event) => props.setEmail(event.target.value)}
        defaultValue={props.email}
        autoFocus
      />
      <CustomButton
        loading={props.loading}
        type="submit"
        fullWidth
        variant="contained"
        color={"primary"}
        disabled={props.email === ""}
        sx={{ mt: 3, mb: 3 }}
      >
        Send Confirmation Code
      </CustomButton>
      <Link href="/auth?current=register" passHref>
        <MUILink variant="body2">
          {"Don't have an account? Create one!"}
        </MUILink>
      </Link>
    </Box>
  );
}
