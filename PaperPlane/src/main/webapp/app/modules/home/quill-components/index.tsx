import React, { useEffect, useState } from 'react';

function IndexPage({ onSelectDocument }: { onSelectDocument: (id: number) => void }) {
  const [documents, setDocuments] = useState<{ title: string; id: number }[]>([]);

  useEffect(() => {
    // Fetch documents from your API
    fetch('http://localhost:8080/api/documents')
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleTitleClick = (id: number) => {
    onSelectDocument(id); // Pass the ID when a title is clicked
  };

  return (
    <div>
      <h1>Document Titles</h1>
      <ul>
        {documents.map((document, index) => (
          <li key={index}>
            <button onClick={() => handleTitleClick(document.id)}>{document.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexPage;
