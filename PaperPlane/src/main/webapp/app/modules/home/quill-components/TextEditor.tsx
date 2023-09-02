// src/components/TextEditor.jsx
import React, { useEffect, useRef, useState } from 'react';
//import Quill from 'quill';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import {render} from "@testing-library/react";

//import Quill from "quill/quill"; // Import Quill's CSS




function TextEditor() {
  const [editorValue, setEditorValue] = useState('');

  return (
      <ReactQuill
          value={editorValue}
          onChange={(value) => setEditorValue(value)}
      />
  );
}

//theme: 'snow'

// <script>
//     var quill = new Quill('#editor', {
//     theme: 'snow'
// });
// </script>

// <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
export default TextEditor;
