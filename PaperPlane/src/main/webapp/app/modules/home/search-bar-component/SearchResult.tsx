import React from 'react';
import './SearchResult.css';

const SearchResult = ({ result, onSelectDocument }) => {
  const handleSelection = () => {
    // Call the onSelectDocument function and pass the selected document
    onSelectDocument(result);
  };



  return (

    <div

      className="search-result"
      onClick={handleSelection} // Call handleSelection when the div is clicked
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // Trigger the selection when the Enter key is pressed
          handleSelection();
        }
      }}
      role="button" // Make it accessible as a button
      tabIndex={0} // Allow it to be focused
    >
    &emsp;
      {result.title}
    </div>

  );
};

export default SearchResult;
