import { Box, useTheme } from "@mui/material";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Typography } from "@tiptap/extension-typography";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import isEqual from "lodash/isEqual";
import { NOTE_DESCRIPTION_CHAR_LIMIT } from "../../../constants/input-limits";
import RemainingCharCount from "./RemainingCharCount";
import BubbleMenuContent from "./RichTextArea/BubbleMenuContent";

const charLimit = NOTE_DESCRIPTION_CHAR_LIMIT;

export default function RichTextArea({
  content,
  setContent = null,
  placeholder = "",
  editable = false,
  preview = false,
  styles = {},
}) {
  //#region Hooks

  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      CharacterCount.configure({
        limit: charLimit,
      }),
      Placeholder.configure({
        placeholder,
      }),
      StarterKit.configure({
        hardBreak: false,
      }),
      Typography,
    ],
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
    content,
    editable,
  });

  //#endregion

  // TODO: Return loading indicator here
  if (!editor) {
    return null;
  }

  if (editor.isEditable !== editable) {
    editor.setEditable(editable);
  }

  if (!isEqual(editor.getJSON(), content)) {
    editor.commands.setContent(content);
  }

  return (
    <Box
      sx={{
        position: "relative",
        ".ProseMirror": {
          ...styles,
          overflow: preview ? "hidden" : "scroll",
          px: "0.8rem",
          py: "0.8rem",
          outlineColor: preview ? "transparent" : theme.palette.action.disabled,
          outlineStyle: "solid",
          outlineWidth: "1px",
          borderRadius: "2px",
          "& > p": {
            lineHeight: "1.25rem", // Within paragraph
            margin: "0 0 0.25rem 0", // Between paragraphs
          },
        },
        ".ProseMirror:hover, .formatting-toolbar": {
          outlineColor: preview
            ? "transparent"
            : editable
            ? theme.palette.action.active
            : theme.palette.action.disabled,
        },
        ".ProseMirror:focus-visible, .formatting-toolbar": {
          outlineColor: theme.palette.primary.main,
          outlineWidth: "2px",
        },
        ".ProseMirror p.is-editor-empty:first-of-type::before": {
          color: theme.palette.text.secondary,
          content: "attr(data-placeholder)",
          float: "left",
          height: 0,
          pointerEvents: "none",
        },
      }}
    >
      <EditorContent editor={editor}>
        {editable && (
          <>
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <BubbleMenuContent editor={editor} />
            </BubbleMenu>
            <div
              style={{
                position: "absolute",
                left: "94%",
                bottom: "-0.2rem",
              }}
            >
              <RemainingCharCount
                stringLength={editor.storage.characterCount.characters()}
                characterLimit={charLimit}
                errorColorAt={100}
                onlyDisplayAfterError
              />
            </div>
          </>
        )}
      </EditorContent>
    </Box>
  );
}
