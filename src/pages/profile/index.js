import Markdown from "@/components/markdown/Markdown";
import { useState } from "react";

export default function Profile() {
  const [html, setHtml] = useState('')
  return <Markdown onChange={setHtml} />
}
