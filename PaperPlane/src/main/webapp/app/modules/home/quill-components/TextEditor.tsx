import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

function TextEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [searchId, setSearchId] = useState(''); // State to store the entered ID

  const fetchData = () => {
    fetch(`http://localhost:8080/api/documents/${searchId}`)
      .then((response) => response.json())
      .then((data) => {
        setEditorValue(data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component initially loads
  }, []);

  // Function to handle the button click and update the ID
  const handleSearch = () => {
    fetchData(); // Fetch data with the new ID
  };

  return (
    <div>
      <div>
        {/* Search bar for entering the ID */}
        <input
          type="number"
          placeholder="Enter ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {/* Button to trigger the search */}
        <button onClick={handleSearch}>Search</button>
      </div>
      <ReactQuill
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />
    </div>
  );
}

export default TextEditor;
