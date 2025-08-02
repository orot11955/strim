'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import CodeBlock from '@tiptap/extension-code-block'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function TiptapMd({ onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlock],
    content: '<p>시작해볼까요?</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    return () => editor?.destroy()
  }, [editor])

  const onSave = () => {
    console.log("HTML", editor.getHTML())
    console.log("JSON", editor.getJSON())
  }


  return (
    <>
    <div className='md-editor'>
      <EditorContent editor={editor} />
    </div>
    <button onClick={onSave}>save</button>
    </>
)
}