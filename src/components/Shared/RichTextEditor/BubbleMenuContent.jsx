import {
  CodeRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  TitleRounded,
} from "@mui/icons-material";
import {
  EDITOR_MARKS,
  EDITOR_NODES,
  getActiveEditorMarks,
} from "../../../models/text-editor";
import {
  BubbleMenuToggleButton,
  BubbleMenuToggleButtonGroup,
} from "../../../styles/components/rich-text";
import CustomTooltip from "../CustomTooltip";

export default function BubbleMenuContent({ editor }) {
  // In this context, active refers to the currently selected text in the editor
  // Marks are classified as formatting data applied to a node (e.g. bold, italic, etc)
  const activeMarks = getActiveEditorMarks(editor);
  // Nodes are the actual content structures (e.g. paragraph <p>, heading <h1>, etc)
  const activeNodes = [];

  return (
    <BubbleMenuToggleButtonGroup
      value={activeMarks}
      onMouseDown={(e) => e.preventDefault()}
    >
      <CustomTooltip title="Bold">
        <BubbleMenuToggleButton
          value={EDITOR_MARKS.BOLD}
          size={"small"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FormatBoldRounded
            color={
              activeMarks.includes(EDITOR_MARKS.BOLD) ? "primary" : "disabled"
            }
          />
        </BubbleMenuToggleButton>
      </CustomTooltip>
      <CustomTooltip title="Italic">
        <BubbleMenuToggleButton
          value={EDITOR_MARKS.ITALIC}
          size={"small"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FormatItalicRounded
            color={
              activeMarks.includes(EDITOR_MARKS.ITALIC) ? "primary" : "disabled"
            }
          />
        </BubbleMenuToggleButton>
      </CustomTooltip>
      <CustomTooltip title="Title">
        <BubbleMenuToggleButton
          value={EDITOR_NODES.HEADING}
          size={"small"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <TitleRounded
            color={
              editor.isActive(EDITOR_NODES.HEADING, { level: 2 })
                ? "primary"
                : "disabled"
            }
          />
        </BubbleMenuToggleButton>
      </CustomTooltip>
      <CustomTooltip title="Code">
        <BubbleMenuToggleButton
          value={EDITOR_MARKS.CODE}
          size={"small"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeRounded
            color={
              activeMarks.includes(EDITOR_MARKS.CODE) ? "primary" : "disabled"
            }
          />
        </BubbleMenuToggleButton>
      </CustomTooltip>
    </BubbleMenuToggleButtonGroup>
  );
}
