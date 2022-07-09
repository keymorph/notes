import { Fade, Typography } from "@mui/material";
import CustomTooltip from "./CustomTooltip";

export default function RemainingCharCount({
  stringLength,
  characterLimit,
  errorColorAt = characterLimit * 0.3,
}) {
  const remainingCharCount = characterLimit - stringLength;

  return (
    <CustomTooltip title={"Remaining characters"}>
      <Fade in={stringLength !== 0}>
        <Typography
          variant={"subtitle2"}
          color={remainingCharCount > errorColorAt ? "text.secondary" : "error"}
          mr={"0.3rem"}
        >
          {remainingCharCount}
        </Typography>
      </Fade>
    </CustomTooltip>
  );
}
