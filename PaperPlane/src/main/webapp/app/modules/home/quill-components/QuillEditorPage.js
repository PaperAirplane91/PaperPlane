import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import './quillcss.css';

function QuillEditorPage() {
  // Retrieve query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const documentId = urlParams.get('id');
  const contentFromQuery = urlParams.get('content') || '';

  const [editorValue, setEditorValue] = useState(contentFromQuery);
  const [contentChanged, setContentChanged] = useState(false);

  // Function to handle saving the content
  const handleSave = async () => {
    try {
      // Send the updated content back to the server
      const response = await fetch(`http://localhost:8086/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: documentId,
          content: editorValue,
        }),
      });

      if (response.ok) {
        console.log('Document content updated successfully');
        setContentChanged(false); // Reset the content changed flag
      } else {
        console.error('Error updating document content:', response.status);
      }
    } catch (error) {
      console.error('Error updating document content:', error);
    }
  };

  // Listen for changes in the editor content
  useEffect(() => {
    if (editorValue !== contentFromQuery) {
      setContentChanged(true);
    } else {
      setContentChanged(false);
    }
  }, [editorValue, contentFromQuery]);

  return (
    <div>
      <ReactQuill
        className="quill-editor"
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />
      {contentChanged && (
        <button onClick={handleSave} className="btnSave">
          Save Changes
        </button>
      )}
    </div>
  );
}

export default QuillEditorPage;
