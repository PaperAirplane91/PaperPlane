import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayResult from "app/modules/home/search-bar-component/DisplayResult";
import 'react-quill/dist/quill.snow.css';
import './SearchBar.css';

function DocumentSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/documents/document-title/${searchQuery}`);
      if (response.status === 200) {
        const data = response.data;
        setDocumentContent(data.content);
      } else {
        // Handle errors if needed
        console.error('Error searching for document:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching for document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search for a document by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {documentContent && <DisplayResult content={documentContent} />}
    </div>
  );
}

export default DocumentSearchBar;





