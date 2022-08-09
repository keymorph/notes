import { useTheme } from "@mui/material";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Typography } from "@tiptap/extension-typography";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import isEqual from "lodash/isEqual";
import { NOTE_DESCRIPTION_CHAR_LIMIT } from "../../constants/input-limits";
import { RichTextEditorBox } from "../../styles/components/rich-text";
import RemainingCharCount from "./RemainingCharCount";
import BubbleMenuContent from "./RichTextEditor/BubbleMenuContent";

const charLimit = NOTE_DESCRIPTION_CHAR_LIMIT;

export default function RichTextEditor({
  content,
  setContent = null,
  placeholder = "",
  editable = false,
  style = {},
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
    <RichTextEditorBox
      sx={{
        ".ProseMirror": {
          ...style,
        },
        ".ProseMirror:hover": {
          outlineColor: editable
            ? theme.palette.action.active
            : theme.palette.action.disabled,
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
                left: "96%",
                bottom: "1rem",
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
    </RichTextEditorBox>
  );
}
