"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  type Editor as EditorInstanceProps,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback } from "react";
import {
  FaBold,
  FaItalic,
  FaParagraph,
  FaStrikethrough,
  FaUnlink,
} from "react-icons/fa";
import { FaLink, FaQuoteLeft } from "react-icons/fa6";
import { RxDividerHorizontal } from "react-icons/rx";

interface MenuBarProps {
  editor: EditorInstanceProps | null;
}

interface EditorProps {
  content?: string | null;
  setContent: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <FaParagraph />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FaQuoteLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RxDividerHorizontal />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <FaLink />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <FaUnlink />
        </button>
      </div>
    </div>
  );
};

const ext = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    HTMLAttributes: {
      class: "text-indigo-500 underline cursor-pointer hover:text-indigo-700",
    },
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export const Editor = ({
  content = null,
  setContent,
  placeholder,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      ...ext,
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    editorProps: {
      handleDOMEvents: {
        beforeinput: () => true,
      },
    },
    immediatelyRender: false,
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="mt-3 p-3 border border-gray-200 text-xs"
      />
    </>
  );
};
