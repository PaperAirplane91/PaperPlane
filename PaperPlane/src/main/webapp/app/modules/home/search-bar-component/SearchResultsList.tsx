// import React, {useState, useEffect, useRef} from 'react';
// import SearchResult from "./SearchResult";
//
// interface SearchResultsListProps {
//   results: any[]; // Adjust the type to match the actual data type of results
//   onSelectDocument: (selectedDocument: any) => void;
// }
//
// const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, onSelectDocument }) => {
// // Check if there are results or if the search bar is empty
//   if (!results.length) {
//     return null; // Return null to render nothing
//     }
//   return (
//     <div className="results-list">
//       {results.map((result, id) => (
//         <SearchResult result={result} key={id} onSelectDocument={onSelectDocument} />
//       ))}
//     </div>
//   );
// };
//
//
//    export default SearchResultsList;
//
import React from 'react';
import SearchResult from "./SearchResult";

interface SearchResultsListProps {
  results: any[]; // Adjust the type to match the actual data type of results
  onSelectDocument: (selectedDocument: any) => void;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, onSelectDocument }) => {
  // Check if there are results to display
  if (!results.length) {
    return null; // Return null to render nothing when there are no results
  }

  return (
    <div className="results-list">
      {results.map((result, id) => (
        <SearchResult result={result} key={id} onSelectDocument={onSelectDocument} />
      ))}
    </div>
  );
};

export default SearchResultsList;
