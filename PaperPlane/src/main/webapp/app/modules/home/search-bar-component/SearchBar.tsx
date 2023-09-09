  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
//   import DisplayResult from "app/modules/home/search-bar-component/DisplayResult";
  import 'react-quill/dist/quill.snow.css';
  import './SearchBar.css';
//
//   function DocumentSearchBar() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [documentContent, setDocumentContent] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
  const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState('');

     const fetchData = (value) => {
    fetch(`http://localhost:8080/api/documents?eagerload=false`)
      .then((response) => response.json())
      .then((json) => {

        const results = json.filter((document) => {
            return (
            value &&
            document &&
            document.title &&
            document.title.toLowerCase().includes(value)
            );
        });
         console.log(results);
         setResults(results);

      });
  };

     const handleChange = (value) => {
       setInput(value);
       fetchData(value);
     };

     return (
       <div className="search-bar-container">
         <input
           className="search-input"
           type="text"
           placeholder="Search for a document by title"
           value={input}
           onChange={(e) => handleChange(e.target.value)}
         />
       </div>
     );
   };


   export default SearchBar;

//      const handleSearch = async () => {
//       setIsLoading(true);
//
//       try {
//
//           const regex = new RegExp(searchQuery, 'i');
//
//   //       const response = await axios.get(`/api/documents/document-title/${searchQuery}`);
//           const response = await axios.get(`/api/documents/document-title`);
//         if (response.status === 200) {
//           const data = response.data;
//           const matchingTitles = data.filter((title) => regex.test(title));
// //           setDocumentContent(data.content);
//         } else {
//           // Handle errors if needed
//           console.error('Error searching for document:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error searching for document:', error);
//       } finally {
//         setIsLoading(false);
//       }
// //     };
//      const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//           // Prevent the default behavior of form submission
//           event.preventDefault();
//           handleSearch();
//         }
//       };

//     return (
//       <div className="search-bar-container">
//         <input
//           className="search-input"
//           type="text"
//           placeholder="Search for a document by title"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="search-button" onClick={handleSearch} disabled={isLoading}>
//           {isLoading ? 'Searching...' : 'Search'}
//         </button>
//         {documentContent && <DisplayResult content={documentContent} />}
//       </div>
//     );
//   }
//
//   export default DocumentSearchBar;





