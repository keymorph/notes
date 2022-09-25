import { generateHTML } from "@tiptap/core";
import { Typography } from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import { RichTextAreaBox } from "../../styles/components/rich-text";

/**
 * Returns a view only Rich Text component
 *
 * @param {Object} content - The content to render
 * @param {number} maxNodes - The maximum number of nodes to render
 * @param {Object} style - The styles to apply to the component
 * @returns {JSX.Element}
 */
export default function RichTextArea({ content, maxNodes, style }) {
  const htmlContent = useMemo(() => {
    const smallerContent = content.content.slice(0, maxNodes); // Only display the first 20 nodes
    return DOMPurify.sanitize(
      generateHTML({ type: content.type, content: smallerContent }, [
        StarterKit,
        Typography,
      ])
    );
  }, [content.content, content.type, maxNodes]);

  return (
    <RichTextAreaBox
      style={style}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
