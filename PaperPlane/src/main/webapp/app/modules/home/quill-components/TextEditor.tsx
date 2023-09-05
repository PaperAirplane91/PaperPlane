import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import './quillcss.css'; // Import your custom CSS file

// CSS styles for the boxes
const boxContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '10px', // Adjust the gap as needed
};

const boxStyle: React.CSSProperties = {
  width: '100px', // Adjust the width as needed
  height: '100px', // Adjust the height as needed
  border: '1px solid #ccc',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

function TextEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null); // Track the selected document ID
  const [documentTitles, setDocumentTitles] = useState<{ id: number; title: string }[]>([]);

  const fetchData = () => {
    // Fetch document titles and IDs from your API
    fetch('http://localhost:8080/api/documents')
      .then((response) => response.json())
      .then((data) => {
        const titlesAndIds = data.map((document: { id: number; title: string }) => ({
          id: document.id,
          title: document.title,
        }));
        setDocumentTitles(titlesAndIds);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch document titles when the component first loads.
  }, []);

  const handleDocumentSelect = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/documents/${id}`);
      if (response.ok) {
        const data = await response.json();
        const content = data.content || '';
        setEditorValue(content);
        setSelectedDocumentId(id); // Mark a document as selected
      } else {
        console.error('Error fetching content:', response.status);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleSave = async () => {
    if (selectedDocumentId !== null) {
      try {
        const response = await fetch(`http://localhost:8080/api/documents/${selectedDocumentId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedDocumentId,
            content: editorValue,
          }),
        });

        if (response.ok) {
          console.log('Document content updated successfully');
        } else {
          console.error('Error updating document content:', response.status);
        }
      } catch (error) {
        console.error('Error updating document content:', error);
      }
    }
  };

  return (
    <div>
      {/* Style the boxes using the defined styles */}
      <div style={boxContainerStyle}>
        {documentTitles.map(({ id, title }) => (
          <div key={id} style={boxStyle}>
            {/* Box content */}
            <button onClick={() => handleDocumentSelect(id)}>{title}</button>
          </div>
        ))}
      </div>

      {selectedDocumentId !== null && (
        <div>
          <ReactQuill
            className="quill-editor" // Apply the CSS class here
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
          />

          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TextEditor;
