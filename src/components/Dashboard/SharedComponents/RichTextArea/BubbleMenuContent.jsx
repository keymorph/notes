import {
  CodeRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  TitleRounded,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import CustomTooltip from "../CustomTooltip";

// <motion.div
//   style={{
//     position: "absolute",
//     width: "100%",
//     padding: "0.2rem",
//     display: "flex",
//     flexDirection: "row",
//     zIndex: "1",
//     outlineColor: "grey",
//     outlineStyle: "solid",
//     outlineWidth: "1px",
//     borderRadius: "4px 4px 0 0",
//   }}
//   className="formatting-toolbar"
// >

export default function BubbleMenuContent({ editor }) {
  return (
    <Box
      sx={{
        backgroundColor: "background.highlight",
        backdropFilter: "blur(6px)",
        borderRadius: 5,
      }}
    >
      <CustomTooltip title="Bold">
        <IconButton
          color={editor.isActive("bold") ? "primary" : "default"}
          size={"small"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FormatBoldRounded />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Italic">
        <IconButton
          color={editor.isActive("italic") ? "primary" : "default"}
          size={"small"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FormatItalicRounded />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Title">
        <IconButton
          color={
            editor.isActive("heading", { level: 2 }) ? "primary" : "default"
          }
          size={"small"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <TitleRounded />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Code">
        <IconButton
          color={editor.isActive("codeBlock") ? "primary" : "default"}
          size={"small"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeRounded />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
}
