'use client'
import { useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/core';

// Minimal language registrations (add more as needed)
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('bash', bash);

// Helper: localStorage persistence
const STORAGE_KEY = 'bearlike.currentNote';


export default function MarkdownEditor({ onChange }) {

  const [title, setTitle] = useState('Untitled');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1,2,3,4] },
        codeBlock: false, // we use CodeBlockLowlight instead
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Typography,
      HorizontalRule,
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      Placeholder.configure({
        placeholder: "Write naturally. Use # for headings, -, * for lists, and ``` for code…",
        showOnlyWhenEditable: true,
        includeChildren: true,
      }),
    ],
    content: '<p>Type \\"/\\" to open the command bar.</p>',
    immediatelyRender: false,
    autofocus: 'end',
    editorProps: {
      attributes: { class: 'ProseMirror bearlike-editor' },
      handleKeyDown: (view, event) => {
        // Quick Command Bar ("/") like Bear — simple demo
        if (event.key === '/' && !event.shiftKey) {
          // Open a tiny command menu (very simple demo)
          const menu = document.getElementById('slash-menu');
          if (menu) menu.style.display = 'block';
        }
        return false;
      },
    },
    onUpdate({ editor }) {
      const payload = { title, content: editor.getJSON() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
  });

  // Expose a tiny API for sidebar demo buttons
  useEffect(() => {
    window.editorApi = {
      loadDemo: (name) => {
        setTitle(name);
        editor?.commands.setContent(`## ${name}\n\n- [ ] Try **bold** (Cmd+B)\n- [ ] Add a #tag\n- [x] Create a task list\n\n\n\n`);
      },
    };
  }, [editor]);

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const { title: t, content } = JSON.parse(raw);
        if (t) setTitle(t);
        if (content) editor?.commands.setContent(content);
      } catch {}
    }
  }, [editor]);

  // Toolbar actions
  const actions = useMemo(() => ([
    { label: 'H1', run: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor?.isActive('heading', { level: 1 }) },
    { label: 'B', run: () => editor?.chain().focus().toggleBold().run(), isActive: () => editor?.isActive('bold') },
    { label: 'I', run: () => editor?.chain().focus().toggleItalic().run(), isActive: () => editor?.isActive('italic') },
    { label: 'UL', run: () => editor?.chain().focus().toggleBulletList().run(), isActive: () => editor?.isActive('bulletList') },
    { label: 'OL', run: () => editor?.chain().focus().toggleOrderedList().run(), isActive: () => editor?.isActive('orderedList') },
    { label: 'Task', run: () => editor?.chain().focus().toggleTaskList().run(), isActive: () => editor?.isActive('taskList') },
    { label: 'Code', run: () => editor?.chain().focus().toggleCodeBlock().run(), isActive: () => editor?.isActive('codeBlock') },
    { label: 'Quote', run: () => editor?.chain().focus().toggleBlockquote().run(), isActive: () => editor?.isActive('blockquote') },
    { label: 'HR', run: () => editor?.chain().focus().setHorizontalRule().run(), isActive: () => false },
    { label: 'Link', run: () => {
        const url = prompt('Enter URL');
        if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }, isActive: () => editor?.isActive('link') },
  ]), [editor]);

  return (
    <div className="editor-wrap">
      <div className="titlebar">
        <input
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="toolbar">
          {actions.map((a) => (
            <button key={a.label}
              className={`tool-btn ${a.isActive() ? 'active' : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={a.run}
            >{a.label}</button>
          ))}
        </div>
      </div>

      <div id="slash-menu" className="slash-menu" style={{ display: 'none' }}>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>Heading 1</button>
        <button onClick={() => editor?.chain().focus().toggleTaskList().run()}>Task List</button>
        <button onClick={() => editor?.chain().focus().setHorizontalRule().run()}>Horizontal Rule</button>
        <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Blockquote</button>
        <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code Block</button>
        <button onClick={() => (document.getElementById('slash-menu').style.display='none')}>Close</button>
      </div>

      <div className="editor-surface">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}