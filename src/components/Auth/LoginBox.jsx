import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";

import CustomButton from "../Themes/Custom/Button";

export default function LoginBox(props) {
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
        method="post"
        action="/api/auth/callback/credentials"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <TextField
          name="csrfToken"
          type="hidden"
          defaultValue={props.csrfToken}
          sx={{
            display: "none",
          }}
        />
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
        <Grid container justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={props.remember}
            onChange={(event) => props.setRemember(event.target.checked)}
          />
          <Link
            href="#"
            variant="body2"
            sx={{ alignSelf: "center" }}
            onClick={() => {
              props.setCurrentBox("nopass");
            }}
          >
            Forgot password?
          </Link>
        </Grid>
        <CustomButton
          loading={props.loading}
          type="submit"
          fullWidth
          variant="contained"
          disabled={props.email === "" || props.password === ""}
          sx={{ mt: 3, mb: 3 }}
        >
          Sign In
        </CustomButton>
        <Link
          href="#"
          variant="body2"
          onClick={() => {
            props.setCurrentBox("register");
          }}
        >
          {"Don't have an account yet? Create one!"}
        </Link>
      </Box>
    </Box>
  );
}
