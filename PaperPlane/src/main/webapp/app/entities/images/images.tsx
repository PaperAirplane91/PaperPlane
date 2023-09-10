import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IImages } from 'app/shared/model/images.model';
import { getEntities } from './images.reducer';

import TextEditor from 'app/modules/home/quill-components/TextEditor';
import SearchBar from 'app/modules/home/search-bar-component/SearchBar';

import SearchResultsList from 'app/modules/home/search-bar-component/SearchResultsList';

import TextEditorWithSelectedDocumentName from './TextEditorWithSelectedDocument'; // Import the new component


export const Images = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const imagesList = useAppSelector(state => state.images.entities);
  const loading = useAppSelector(state => state.images.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };
  const handleDocumentSelection = (selectedDocument) => {
    // Handle the selected document here
    console.log('Selected document:', selectedDocument);
  };


// import {DocumentSearchBar} from './search-bar-component/SearchBar' // updated searchBar testing

   const [results , setResults] = useState([]); // searchBar component
  return (
    <div>
      &nbsp;
      <h2>Edit Document:</h2>
      <div className="d-flex justify-content-end">
        {/* ... */}
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>
          <SearchBar setResults={setResults } />
          </div>
          <div className="results-list">
{/*           <SearchResultsList results={results} /> */}
           <SearchResultsList results={results} onSelectDocument={handleDocumentSelection} />
        </div>

        <TextEditor />
        <TextEditorWithSelectedDocumentName /> {/* Use the new component */}
      </div>
    </div>
  );
};

export default Images;
