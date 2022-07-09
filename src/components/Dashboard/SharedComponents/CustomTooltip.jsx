import { Tooltip } from "@mui/material";

export default function CustomTooltip({
  title,
  followCursor = true,
  placement = "top",
  flexItem = false,
  disableableButton = false, // Whether the tooltip is for a disabled button
  children,
}) {
  return (
    <Tooltip
      title={title}
      enterDelay={750}
      followCursor={followCursor}
      placement={placement}
    >
      {disableableButton ? (
        <span
          style={
            flexItem
              ? {
                  display: "flex",
                }
              : {}
          }
        >
          {children}
        </span>
      ) : (
        children
      )}
    </Tooltip>
  );
}
