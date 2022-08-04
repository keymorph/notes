import {
  Alert,
  Grow,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AlertSnackbar({
  severity,
  message,
  autoHideDuration = 5000,
}) {
  //#region Hooks

  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Animate the progress from 100 to 0 over autoHideDuration
    const intervalID = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          setOpen(false);
          clearInterval(intervalID);
          return 0;
        }
        return prev - (100 / autoHideDuration) * 300;
      });
    }, 300);

    return () => {
      clearInterval(intervalID);
    };
  }, [autoHideDuration]);

  //#endregion

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      TransitionComponent={Grow}
    >
      <div>
        <Alert
          sx={{
            backgroundColor: "background.highlight",
            backdropFilter: "blur(8px)",
            boxShadow: "0px 0.2rem 0.4rem rgba(0, 0, 0, 0.4)",
          }}
          severity={severity}
          width={"100%"}
        >
          <Typography>{message}</Typography>
        </Alert>
        <LinearProgress
          color={severity}
          variant="determinate"
          value={progress}
          sx={{ borderRadius: "0 0 2rem 2rem", mt: "-0.25rem" }}
        />
      </div>
    </Snackbar>
  );
}
