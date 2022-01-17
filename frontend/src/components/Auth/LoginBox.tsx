import {
  Checkbox,
  Link,
  Box,
  FormControlLabel,
  TextField,
  Avatar,
  Grid,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import GradientButton from "../UI/Button";

interface LoginBoxProps {
  handleSubmit: (event: any) => void;
  setEmail: (email: string) => void;
  setCurrentBox: (currentBox: string) => void;
  setPassword: (password: string) => void;
  setRemember: (remember: boolean) => void;
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginBox(props: LoginBoxProps) {
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
          id="email"
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
          id="password"
          autoComplete="current-password"
          onChange={(event) => props.setPassword(event.target.value)}
        />
        <Grid container justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={props.remember}
            onChange={(event) =>
              props.setRemember((event.target as HTMLInputElement).checked)
            }
          />
          <Link
            href="javascript:void (0)"
            variant="body2"
            sx={{ alignSelf: "center" }}
            onClick={() => {
              props.setCurrentBox("nopass");
            }}
          >
            Forgot password?
          </Link>
        </Grid>
        <GradientButton
          type="submit"
          fullWidth
          variant="contained"
          color={"primary"}
          disabled={props.email === "" || props.password === ""}
          sx={{ mt: 3, mb: 3 }}
        >
          Sign In
        </GradientButton>
        <Link
          href="javascript:void (0)"
          variant="body2"
          onClick={() => {
            props.setCurrentBox("register");
          }}
        >
          {"Don't have an account? Create one!"}
        </Link>
      </Box>
    </Box>
  );
}
