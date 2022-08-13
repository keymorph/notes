import { Box, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

const richTextStyles = {
  p: {
    lineHeight: "1.2rem", // Within paragraph
    margin: "0 0 0.25rem 0", // Between paragraphs
  },
  pre: {
    lineHeight: "1.2rem", // Within pre
    margin: "0 0 0.25rem 0", // Between pre
  },
};

export const RichTextAreaBox = styled(Box)(({ theme }) => richTextStyles);
export const RichTextEditorBox = styled(Box)(({ theme }) => ({
  position: "relative",
  ".ProseMirror": {
    ...richTextStyles,
    color: theme.palette.text.primary,
    overflow: "scroll",
    padding: "0.8rem",
    outlineColor: theme.palette.action.disabled,
    outlineStyle: "solid",
    outlineWidth: "1px",
    borderRadius: "2px",
  },
  ".ProseMirror p.is-editor-empty:first-of-type::before": {
    color: theme.palette.text.secondary,
    content: "attr(data-placeholder)",
    float: "left",
    height: 0,
    pointerEvents: "none",
  },
}));

export const BubbleMenuToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    backdropFilter: "blur(8px)",
    backgroundColor: theme.palette.background.inactive,
    "&:hover": {
      backgroundColor: theme.palette.background.active,
    },
    padding: "0.4rem",
    transition: "all 0.2s ease-out",
    borderRadius: "0.4rem",
  })
);

export const BubbleMenuToggleButton = styled(ToggleButton)(({ theme }) => ({
  height: "1.8rem",
  border: 0,
  "&.Mui-disabled": {
    border: 0,
  },
  "& svg": {
    transition: "all 0.2s ease-out",
  },
}));
