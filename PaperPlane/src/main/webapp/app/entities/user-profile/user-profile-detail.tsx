import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-profile.reducer';

export const UserProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userProfileEntity = useAppSelector(state => state.userProfile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userProfileDetailsHeading">User Profile</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{userProfileEntity.id}</dd>
          <dt>
            <span id="userId">User Id</span>
          </dt>
          <dd>{userProfileEntity.userId}</dd>
          <dt>
            <span id="username">Username</span>
          </dt>
          <dd>{userProfileEntity.username}</dd>
          <dt>
            <span id="password">Password</span>
          </dt>
          <dd>{userProfileEntity.password}</dd>
          <dt>User</dt>
          <dd>{userProfileEntity.user ? userProfileEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserProfileDetail;
