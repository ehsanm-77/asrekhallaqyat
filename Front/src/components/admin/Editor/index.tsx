import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
function Editor({
  setEditorValue,
  value,
}: {
  setEditorValue: (arg: string) => void;
  value: () => string;
}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: ['red', '#785412'] }],
      [{ background: ['red', '#785412'] }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];

  const [code, setCode] = useState('');
  const handleProcedureContentChange = (content: string) => {
    setCode(content);
    setEditorValue(content);
    //let has_attribues = delta.ops[1].attributes || "";
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
  };

  return (
    <Box>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value()}
        onChange={handleProcedureContentChange}
      />
    </Box>
  );
}

export default Editor;
