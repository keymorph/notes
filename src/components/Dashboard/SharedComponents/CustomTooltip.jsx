import { Tooltip } from "@mui/material";

export default function CustomTooltip({
  title,
  followCursor = true,
  placement = "top",
  flexItem = false,
  disabledButton = false, // Whether the tooltip is for a disabled button
  children,
}) {
  return (
    <Tooltip
      title={title}
      enterDelay={500}
      followCursor={followCursor}
      placement={placement}
    >
      {disabledButton ? (
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
