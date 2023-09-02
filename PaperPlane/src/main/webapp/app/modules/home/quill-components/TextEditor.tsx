// src/components/TextEditor.jsx
import React, { useEffect, useRef, useState } from 'react';
//import Quill from 'quill';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import {render} from "@testing-library/react";


function TextEditor() {
  const [editorValue, setEditorValue] = useState('');

const ID = 3;

  useEffect(() => {
    fetch(`http://localhost:8080/api/documents/${ID}`)
      .then((response) => response.json())
      .then((data) => {
        setEditorValue(data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
      <ReactQuill
          value={editorValue}
          onChange={(value) => setEditorValue(value)}
      />
  );
}

export default TextEditor;
