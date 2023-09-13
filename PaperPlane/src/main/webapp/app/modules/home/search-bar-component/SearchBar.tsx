//   import React, { useState, useEffect } from 'react';
//   import axios from 'axios';
//   import 'react-quill/dist/quill.snow.css';
//   import './SearchBar.css';
//
//   const SearchBar = ({ setResults }) => {
//     const [input, setInput] = useState('');
//
//      const fetchData = (value) => {
//     fetch(`http://localhost:8080/api/documents?eagerload=false`)
//       .then((response) => response.json())
//       .then((json) => {
//
//         const results = json.filter((document) => {
//             return (
//             value &&
//             document &&
//             document.title &&
//             document.title.toLowerCase().includes(value)
//             );
//         });
//          console.log(results);
//          setResults(results);
//
//       });
//   };
//
//      const handleChange = (value) => {
//        setInput(value);
//        fetchData(value);
//      };
//
//      const handleClear = () => {
//        setInput(''); // Clear the input field
//        setResults([]); // Optionally, clear the search results as well
//      };
//
//      return (
//  <div className="search-bar-container">
//    <input
//      className="search-input"
//      type="text"
//      placeholder="Search for a document by title"
//      value={input}
//      onChange={(e) => handleChange(e.target.value)}
//    />
//    {input && ( // Render the button only if there is text in the input
//      <button
//        className="clear-button"
//        onClick={handleClear}
//      >
//        Clear
//      </button>
//    )}
//  </div>)
//
//    export default SearchBar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import './SearchBar.css';

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  const fetchData = (value) => {
    fetch(`https://pp.zipcode.rocks/api/documents?eagerload=false`)
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

  const handleClear = () => {
    setInput(''); // Clear the input field
    setResults([]); // Optionally, clear the search results as well
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
      {input && ( // Render the button only if there is text in the input
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
