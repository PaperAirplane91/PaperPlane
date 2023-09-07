import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './images.reducer';

export const ImagesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const imagesEntity = useAppSelector(state => state.images.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="imagesDetailsHeading">Images</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{imagesEntity.id}</dd>
          <dt>
            <span id="imageData">Image Data</span>
          </dt>
          <dd>
            {imagesEntity.imageData ? (
              <div>
                {imagesEntity.imageDataContentType ? (
                  <a onClick={openFile(imagesEntity.imageDataContentType, imagesEntity.imageData)}>
                    <img src={`data:${imagesEntity.imageDataContentType};base64,${imagesEntity.imageData}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {imagesEntity.imageDataContentType}, {byteSize(imagesEntity.imageData)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="caption">Caption</span>
          </dt>
          <dd>{imagesEntity.caption}</dd>
          <dt>
            <span id="imageS3Url">Image S 3 Url</span>
          </dt>
          <dd>{imagesEntity.imageS3Url}</dd>
          <dt>Reference Document Id</dt>
          <dd>{imagesEntity.referenceDocumentId ? imagesEntity.referenceDocumentId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/images" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/images/${imagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ImagesDetail;
