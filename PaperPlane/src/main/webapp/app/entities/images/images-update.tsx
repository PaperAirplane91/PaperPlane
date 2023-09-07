import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { IImages } from 'app/shared/model/images.model';
import { getEntity, updateEntity, createEntity, reset } from './images.reducer';

export const ImagesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const documents = useAppSelector(state => state.document.entities);
  const imagesEntity = useAppSelector(state => state.images.entity);
  const loading = useAppSelector(state => state.images.loading);
  const updating = useAppSelector(state => state.images.updating);
  const updateSuccess = useAppSelector(state => state.images.updateSuccess);

  const handleClose = () => {
    navigate('/images');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...imagesEntity,
      ...values,
      referenceDocumentId: documents.find(it => it.id.toString() === values.referenceDocumentId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...imagesEntity,
          referenceDocumentId: imagesEntity?.referenceDocumentId?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="paperPlaneApp.images.home.createOrEditLabel" data-cy="ImagesCreateUpdateHeading">
            Create or edit a Images
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="images-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedBlobField label="Image Data" id="images-imageData" name="imageData" data-cy="imageData" isImage accept="image/*" />
              <ValidatedField label="Caption" id="images-caption" name="caption" data-cy="caption" type="text" />
              <ValidatedField label="Image S 3 Url" id="images-imageS3Url" name="imageS3Url" data-cy="imageS3Url" type="text" />
              <ValidatedField
                id="images-referenceDocumentId"
                name="referenceDocumentId"
                data-cy="referenceDocumentId"
                label="Reference Document Id"
                type="select"
              >
                <option value="" key="0" />
                {documents
                  ? documents.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/images" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton"  type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ImagesUpdate;
