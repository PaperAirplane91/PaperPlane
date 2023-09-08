import React, {useState, useEffect, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';


function DocumentViewer({ content }) {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      // Load the document content into Quill
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [content]);

  return (
    <ReactQuill
      ref={quillRef}
      readOnly={true}
      theme="snow"
      modules={{ toolbar: false }}
    />
  );
}

export default DocumentViewer;
