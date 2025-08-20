import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { useState } from "react";

export default function Profile() {
  const [html, setHtml] = useState('')
  return <MarkdownEditor />
}
