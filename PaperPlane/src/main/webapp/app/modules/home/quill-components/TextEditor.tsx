import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { AuthenticationState, UserState } from './reduxTypes'; // Adjust the import path accordingly

import 'quill/dist/quill.snow.css';
import './quillcss.css';

const boxContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '30px',
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

const isAuthenticated = useSelector((state: { authentication: AuthenticationState }) => state.authentication.isAuthenticated);
const user = useSelector((state: { user: UserState }) => state.user);
const userRole = user ? user.role : '';


  const handleDocumentSelect = async (id: number) => {
    try {

      if (!isAuthenticated) {
            console.error('Unauthorized to edit documents. Please log in.');
            return;
          }
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
      {quillEditorOpen ? ( // Conditional rendering based on the Quill editor state
        <div>
          <ReactQuill
            className="quill-editor"
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
            readOnly={userRole !== 'admin'} // Make the editor read-only for non-admin users
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
