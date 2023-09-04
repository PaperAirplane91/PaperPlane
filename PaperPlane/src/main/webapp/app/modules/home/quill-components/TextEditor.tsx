import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import IndexPage from './index';

function TextEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [showIndexPage, setShowIndexPage] = useState(false);

  const handleDocumentSelect = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/documents/${id}`);
      if (response.ok) {
        const data = await response.json();
        const content = data.content || '';
        setEditorValue(content);
        setShowIndexPage(false);
      } else {
        console.error('Error fetching content:', response.status);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setShowIndexPage(true)}>Go to Index Page</button>
      </div>

      {showIndexPage && <IndexPage onSelectDocument={handleDocumentSelect} />}

      <ReactQuill
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />
    </div>
  );
}

export default TextEditor;
