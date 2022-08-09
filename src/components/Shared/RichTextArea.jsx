import { generateHTML } from "@tiptap/core";
import { Typography } from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import { RichTextAreaBox } from "../../styles/components/rich-text";

export default function RichTextArea({ content }) {
  const htmlContent = useMemo(
    () => DOMPurify.sanitize(generateHTML(content, [StarterKit, Typography])),
    [content]
  );

  return <RichTextAreaBox dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
