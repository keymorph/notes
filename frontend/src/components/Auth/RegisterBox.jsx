import { Avatar, Button, Grid, Link, TextField } from "@mui/material";
import { Box } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";

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
        {/* Harcoded bgcolor (Should be changed in the future) */}
        <Avatar sx={{ bgcolor: "#FE6B8B" }}>
          <LockIcon />
        </Avatar>
      </Grid>
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
          id="email"
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
          id="password"
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
          id="password"
          autoComplete="current-password"
          onChange={(event) => setComfirmPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={
            props.email === "" ||
            props.password === "" ||
            comfirmPassword !== props.password
          }
          sx={{ mt: 3, mb: 3 }}
        >
          Register
        </Button>
        <Link
          href="javascript:void (0)"
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
