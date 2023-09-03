import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

function TextEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [searchId, setSearchId] = useState(''); // Stores the ID that gets entered

  const fetchData = () => {
  //This runs an API call to go into our database, fetch the entry that has the entered ID,
  //and then place the content listed in that into our editor
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
    fetchData(); //This fetches data when the component first loads.
  }, []);

 //Function handles the update when an ID is entered and searched
  const handleSearch = () => {
    fetchData(); // Fetch data from new ID entered by user.
  };

  return (
    <div>
      <div>
        {/* This is where our search bar starts */}
        <input
          type="number"
          placeholder="Enter ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {/* Starts the search by calling the function handleSearch on button click */}
        <button onClick={handleSearch}>Search</button>
      </div>
{/*       This is where our Quill editor is imported */}
      <ReactQuill
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />
    </div>
  );
}

export default TextEditor;
