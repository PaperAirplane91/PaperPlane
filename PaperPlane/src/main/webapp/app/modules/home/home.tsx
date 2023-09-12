import './home.scss';
import Quill from "quill/quill";
import TextEditor from './quill-components/TextEditor';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import SearchBar from "app/modules/home/search-bar-component/SearchBar";

// import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const [selectedDocumentName, setSelectedDocumentName] = useState('');



  return (
    <Row>
      &ensp;
      <h2>View Document: {selectedDocumentName}</h2>
      <TextEditor setSelectedDocumentName={setSelectedDocumentName} />
      &emsp;
    </Row>
  );
};

export default Home;
