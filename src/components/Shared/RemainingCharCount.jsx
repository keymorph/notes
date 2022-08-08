import { Fade, Typography } from "@mui/material";
import CustomTooltip from "./CustomTooltip";

export default function RemainingCharCount({
  stringLength,
  characterLimit,
  errorColorAt = characterLimit * 0.3,
  onlyDisplayAfterError = false,
}) {
  const remainingCharCount = characterLimit - stringLength;
  const isErrorColor = remainingCharCount < errorColorAt;

  return (
    <CustomTooltip title={"Remaining characters"}>
      <Fade in={stringLength !== 0 && (!onlyDisplayAfterError || isErrorColor)}>
        <Typography
          variant={"subtitle2"}
          color={isErrorColor ? "error" : "text.secondary"}
          mr={"0.3rem"}
        >
          {remainingCharCount}
        </Typography>
      </Fade>
    </CustomTooltip>
  );
}
