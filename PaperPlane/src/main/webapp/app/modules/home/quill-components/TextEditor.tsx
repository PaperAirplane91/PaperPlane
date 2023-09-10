import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { AuthenticationState, UserState } from './reduxTypes';
import SearchBar from "app/modules/home/search-bar-component/SearchBar";
import FileUpload from './FileUpload';


import 'quill/dist/quill.snow.css';
import './quillcss.css';

const boxContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '50px', // Adjust the gap as needed

  marginLeft: '70px',
};

function TextEditor({ setSelectedDocumentName }) {
  const [editorValue, setEditorValue] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [documentTitles, setDocumentTitles] = useState<{ id: number; title: string }[]>([]);
  const [quillEditorOpen, setQuillEditorOpen] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

 const fetchData = () => {
   fetch('http://localhost:8080/api/documents')
     .then((response) => response.json())
     .then((data) => {
       const titlesAndIds = data.map((document) => ({
         id: document.id,
         title: document.title,
       }));

       // Grab the titles and IDs.
       //We want them to sort alphabetically instead of by ID.
       //So we use the .sort method.
       titlesAndIds.sort((a, b) => {
         const titleA = a.title.toLowerCase();
         const titleB = b.title.toLowerCase();
         if (titleA < titleB) return -1;
         if (titleA > titleB) return 1;
         return 0;
       });

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

const openDeleteConfirmation = () => {
  setDeleteConfirmationOpen(true);
};

const closeDeleteConfirmation = () => {
  setDeleteConfirmationOpen(false);
};



const handleDelete = async () => {
  if (selectedDocumentId !== null) {
    try {
      const response = await fetch(`http://localhost:8080/api/documents/${selectedDocumentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Document deleted successfully');
        // Add the alert here
        window.alert('File deleted');

        // Reset the state to the initial state
        //Then fetchData to make sure the page is refreshed
        setQuillEditorOpen(false);
        setSelectedDocumentId(null);
        closeDeleteConfirmation();

        fetchData();
      } else {
        console.error('Error deleting document:', response.status);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
};




const handleDocumentSelect = async (id: number) => {
    try {

//       if (!isAuthenticated) {
//             console.error('Unauthorized to edit documents. Please log in.');
//             return;
//           }
      const response = await fetch(`http://localhost:8080/api/documents/${id}`);
      if (response.ok) {
        const data = await response.json();
        const content = data.content || '';
        setSelectedDocumentId(id);

        // Set the selected document's name in the Home component
        setSelectedDocumentName(data.title || ''); // Assuming the document title is in data.title
        setEditorValue(content);
        setQuillEditorOpen(true); // Open the Quill editor within the same component
      } else {
        console.error('Error fetching content:', response.status);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

const handleFileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Assuming you have a variable `documentTitle` that holds the title of the document
    // You should replace this with the actual title you want to use.
    const documentTitle = file.name; // You can modify this to extract the title from user input

    formData.append('title', documentTitle); // Add the document title to the form data

    // Read the file content and append it to the form data
    const fileContent = await file.text();
    formData.append('content', fileContent);

    const response = await fetch('http://localhost:8080/api/documents/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      // Assuming 'data.content' contains the HTML content of the uploaded .txt file
      setEditorValue(data.content); // Set the editor content with the uploaded file content
      console.log('File uploaded successfully');
              window.alert('File uploaded successfully');

      fetchData();
    } else {
      console.error('Error uploading file:', response.status);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
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
          // Add the alert here
          window.alert('File saved');
        } else {
          console.error('Error updating document content:', response.status);
        }
      } catch (error) {
        console.error('Error updating document content:', error);
      }
    }
  };


  const handleBack = () => {
    // Close the Quill editor and show the list of documents
    setQuillEditorOpen(false);
  };

  const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
      return (
        isOpen && (
          <div className="delete-confirmation-modal">
            <div className="delete-confirmation-content">
              <p>Are you sure you want to delete this document?</p>
              <button onClick={onConfirm}>Yes</button>
              <button onClick={onCancel}>No</button>
            </div>
          </div>
        )
      );
    };

return (
  <div>
    &nbsp;
    {quillEditorOpen ? (
      <div>
        {isAuthenticated && (
          <>
            <button onClick={handleSave} className="btnSave">
              Save
            </button>
            <button onClick={openDeleteConfirmation} className="btnDelete">
              Delete
            </button>
          </>
        )}
        <button onClick={handleBack} className="btnBack google-settings-btn">
          Back
        </button>

        <ReactQuill
          className="quill-editor"
          value={editorValue}
          onChange={(value) => setEditorValue(value)}
          readOnly={!isAuthenticated}
        />
      </div>
    ) : (
      <div>
        <div style={{ textAlign: 'center' }}>
          {/* <SearchBar /> */}
        </div>
        &emsp;
        <div style={boxContainerStyle}>
          {documentTitles.map(({ id, title }) => (
            <div key={id} className="parentElement">
              <button className="document" onClick={() => handleDocumentSelect(id)}>
                <img
                  className="img"
                  src="content/images/document_image.png"
                  width="150"
                  height="200"
                  alt="Document"
                />
              </button>
              <button className="docName">{title}</button>
            </div>
          ))}
        </div>
        {/* Place the FileUpload component outside the map loop */}
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
    )}

    <DeleteConfirmationDialog
      isOpen={deleteConfirmationOpen}
      onCancel={closeDeleteConfirmation}
      onConfirm={handleDelete}
    />
  </div>
);

}

export default TextEditor;
