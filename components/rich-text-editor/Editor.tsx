'use client';

import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import Menubar from './Menubar';

export default function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] focus:outline-none p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none',
      },
    },

    // Setting immediatelyRender to false is to prevent the editor from rendering the content immediately
    // because it doesnot support ssr, so we need to render the content after the component is mounted
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : '',
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
