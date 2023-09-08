import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import './quillcss.css';

const boxContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '50px', // Adjust the gap as needed

  marginLeft: '70px',
};

function TextEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [documentTitles, setDocumentTitles] = useState<{ id: number; title: string }[]>([]);
  const [quillEditorOpen, setQuillEditorOpen] = useState(false);

  const fetchData = () => {
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
    fetchData();
  }, []);

  const handleDocumentSelect = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/documents/${id}`);
      if (response.ok) {
        const data = await response.json();
        const content = data.content || '';
        setSelectedDocumentId(id);

        setEditorValue(content);
        setQuillEditorOpen(true); // Open the Quill editor within the same component
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
          <div key={title}>
            {/* Box content */}

            <button className="document" onClick={() => handleDocumentSelect(id)}>
              <img className ="img" src="content/images/document_image.png" width="150" height="200">
            </button>
            <button className="docName">{title}</button>

          </div>
        ))}
      </div>

      {selectedDocumentId !== null && (

        <div>
          <ReactQuill
            className="quill-editor"
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
          />
          <button onClick={handleSave} className="btnSave">
            Save
          </button>
        </div>
      ) : (
        <div>
          <div style={boxContainerStyle}>
            {documentTitles.map(({ id, title }) => (
              <div key={id}>
                <button className="document" onClick={() => handleDocumentSelect(id)}>
                  <img
                    className="img"
                    src="content/images/document_image.png"
                    width="200"
                    height="300"
                    alt="Document"
                  />
                </button>
                <button className="docName">{title}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TextEditor;
