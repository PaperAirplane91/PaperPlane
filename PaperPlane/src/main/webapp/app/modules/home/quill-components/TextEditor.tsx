import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const boxContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '10px',
  padding: '20px', // Add padding to the container
};

const boxStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '250px', // Adjust the maximum width as needed
  minHeight: '100px', // Adjust the minimum height as needed
  border: '1px solid #ccc',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
  borderRadius: '4px', // Add rounded corners
  padding: '10px', // Add padding inside the box
  cursor: 'pointer', // Change cursor on hover
  transition: 'transform 0.2s ease-in-out', // Add a smooth transition effect
};

const boxHoverStyle: React.CSSProperties = {
  transform: 'scale(1.05)', // Scale up on hover
};

function TextEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null); // Track the selected document ID
  const [documentTitles, setDocumentTitles] = useState<string[]>([]);

  const fetchData = () => {
    // Fetch document titles from your API
    fetch('http://localhost:8080/api/documents')
      .then((response) => response.json())
      .then((data) => {
        const titles = data.map((document: { title: string }) => document.title);
        setDocumentTitles(titles);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch document titles when the component first loads.
  }, []);

gir     try {
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
            content: editorValue
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
        {documentTitles.map((title, index) => (
          <div key={index} style={boxStyle}>
            {/* Box content */}
            <button onClick={() => handleDocumentSelect(index + 1)}>{title}</button>
          </div>
        ))}
      </div>

      {selectedDocumentId !== null && (
        <div>
          <ReactQuill
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
