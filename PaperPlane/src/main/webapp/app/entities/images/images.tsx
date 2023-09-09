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
import SearchBar from "app/modules/home/search-bar-component/SearchBar";



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



  return (
    <div>
      <h1 id="images-heading" data-cy="ImagesHeading" >
      <h2>Edit</h2>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/document/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton" >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a New Document
          </Link>
        </div>
      </h1>

      <div>
        <div style={{ textAlign: 'center' }}>
          <SearchBar />
        </div>

        <TextEditor />
      </div>

    </div>
  );
};

export default Images;

{/*       <div className="table-responsive"> */}
{/*         {imagesList && imagesList.length > 0 ? ( */}
{/*           <Table responsive> */}
{/*             <thead> */}
{/*               <tr> */}
{/*                 <th>ID</th> */}
{/*                 <th>Image Data</th> */}
{/*                 <th>Caption</th> */}
{/*                 <th>Image S 3 Url</th> */}
{/*                 <th>Reference Document Id</th> */}
{/*                 <th /> */}
{/*               </tr> */}
{/*             </thead> */}
{/*             <tbody> */}
{/*               {imagesList.map((images, i) => ( */}
{/*                 <tr key={`entity-${i}`} data-cy="entityTable"> */}
{/*                   <td> */}
{/*                     <Button tag={Link} to={`/images/${images.id}`} color="link" size="sm"> */}
{/*                       {images.id} */}
{/*                     </Button> */}
{/*                   </td> */}
{/*                   <td> */}
{/*                     {images.imageData ? ( */}
{/*                       <div> */}
{/*                         {images.imageDataContentType ? ( */}
{/*                           <a onClick={openFile(images.imageDataContentType, images.imageData)}> */}
{/*                             <img src={`data:${images.imageDataContentType};base64,${images.imageData}`} style={{ maxHeight: '30px' }} /> */}
{/*                             &nbsp; */}
{/*                           </a> */}
{/*                         ) : null} */}
{/*                         <span> */}
{/*                           {images.imageDataContentType}, {byteSize(images.imageData)} */}
{/*                         </span> */}
{/*                       </div> */}
{/*                     ) : null} */}
{/*                   </td> */}
{/*                   <td>{images.caption}</td> */}
{/*                   <td>{images.imageS3Url}</td> */}
{/*                   <td> */}
{/*                     {images.referenceDocumentId ? ( */}
{/*                       <Link to={`/document/${images.referenceDocumentId.id}`}>{images.referenceDocumentId.id}</Link> */}
{/*                     ) : ( */}
{/*                       '' */}
{/*                     )} */}
{/*                   </td> */}
{/*                   <td className="text-end"> */}
{/*                     <div className="btn-group flex-btn-group-container"> */}
{/*                       <Button tag={Link} to={`/images/${images.id}`} color="info" size="sm" data-cy="entityDetailsButton"> */}
{/*                         <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span> */}
{/*                       </Button> */}
{/*                       <Button tag={Link} to={`/images/${images.id}/edit`} color="primary" size="sm" data-cy="entityEditButton"> */}
{/*                         <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span> */}
{/*                       </Button> */}
{/*                       <Button tag={Link} to={`/images/${images.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton"> */}
{/*                         <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span> */}
{/*                       </Button> */}
{/*                     </div> */}
{/*                   </td> */}
{/*                 </tr> */}
{/*               ))} */}
{/*             </tbody> */}
{/*           </Table> */}
{/*         ) : ( */}
{/*           !loading && <div className="alert alert-warning">No Images found</div> */}
{/*         )} */}
