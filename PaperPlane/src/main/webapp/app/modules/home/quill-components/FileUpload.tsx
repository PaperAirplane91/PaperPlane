import React, { useState } from 'react';
import './quillcss.css';

function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const convertTxtToHtml = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;

        // Wrap the file content in <pre> tags to preserve formatting
        const htmlContent = `<pre>${fileContent}</pre>`;

        // Now, 'htmlContent' contains the file content as HTML with preserved formatting
        // You can use or display it as needed
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error converting .txt file to HTML:', error);
    }
  };

  return (
//     <div>
//       <input type="file" accept=".txt, .rtf, .rtfd, .html" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>

        <div>
          <label htmlFor="fileInput" className="file-input-label">
            <span>Choose a file</span>
            <input
              type="file"
              id="fileInput"
              accept=".txt, .rtf, .rtfd, .html"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>





  );
}



export default FileUpload;
