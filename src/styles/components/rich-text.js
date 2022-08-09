import { Box, styled } from "@mui/material";

const richTextStyles = {
  p: {
    lineHeight: "1.25rem", // Within paragraph
    margin: "0 0 0.25rem 0", // Between paragraphs
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
  ".ProseMirror:focus-visible": {
    outlineColor: theme.palette.primary.main,
    outlineWidth: "2px",
  },
  ".ProseMirror:focus": {
    outlineColor: theme.palette.primary.main,
  },

  ".ProseMirror p.is-editor-empty:first-of-type::before": {
    color: theme.palette.text.secondary,
    content: "attr(data-placeholder)",
    float: "left",
    height: 0,
    pointerEvents: "none",
  },
}));
