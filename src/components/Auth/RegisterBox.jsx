import LockIcon from "@mui/icons-material/Lock";
import { Avatar, Box, Grid, Link, TextField } from "@mui/material";
import { useState } from "react";

import CustomButton from "../Themes/Custom/Button";

export default function RegisterBox(props) {
  const [comfirmPassword, setComfirmPassword] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <LockIcon />
        </Avatar>
      </Grid>

      <Box
        component="form"
        onSubmit={props.handleSubmit}
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
          type="email"
          onChange={(event) => props.setEmail(event.target.value)}
          defaultValue={props.email}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => props.setPassword(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => setComfirmPassword(event.target.value)}
        />
        <CustomButton
          loading={props.loading}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={
            props.email === "" ||
            props.password === "" ||
            comfirmPassword !== props.password
          }
          sx={{ mt: 3, mb: 3 }}
        >
          Register
        </CustomButton>
        <Link
          href="#"
          variant="body2"
          onClick={() => {
            props.setCurrentBox("login");
          }}
        >
          {"Already have an account? Log in!"}
        </Link>
      </Box>
    </Box>
  );
}
