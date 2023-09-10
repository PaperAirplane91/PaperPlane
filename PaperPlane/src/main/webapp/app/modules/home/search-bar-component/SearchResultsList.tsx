import React, {useState, useEffect, useRef} from 'react';
import SearchResult from "./SearchResult";

// import ReactQuill from 'react-quill';
// import 'quill/dist/quill.snow.css';
interface SearchResultsListProps {
  results: any[]; // Adjust the type to match the actual data type of results
  onSelectDocument: (selectedDocument: any) => void;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, onSelectDocument }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => (
        <SearchResult result={result} key={id} onSelectDocument={onSelectDocument} />
      ))}
    </div>
  );
};


   export default SearchResultsList;

