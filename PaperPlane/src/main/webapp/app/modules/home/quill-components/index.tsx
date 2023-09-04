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
    onSelectDocument(id);
  };

  return (
    <div>
      <h1>Document Titles</h1>
      <div className="box-container">
        {documents.map((document, index) => (
          <div key={index} className="box">
            <button onClick={() => handleTitleClick(document.id)}>{document.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexPage;
