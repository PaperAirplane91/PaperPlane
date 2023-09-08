import React, {useEffect, useState} from 'react';


function DocumentSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/documents/titles/${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
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
    <div>
      <input
        type="text"
        placeholder="Search for a document by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {documentContent && (
        <div>
          <h2>Document Content</h2>
          <p>{documentContent}</p>
        </div>
      )}
    </div>
  );
}

export default DocumentSearchBar;
