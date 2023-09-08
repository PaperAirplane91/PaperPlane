import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserProfile from './user-profile';
import UserProfileDetail from './user-profile-detail';
import UserProfileUpdate from './user-profile-update';
import UserProfileDeleteDialog from './user-profile-delete-dialog';

const UserProfileRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserProfile />} />
    <Route path="new" element={<UserProfileUpdate />} />
    <Route path=":id">
      <Route index element={<UserProfileDetail />} />
      <Route path="edit" element={<UserProfileUpdate />} />
      <Route path="delete" element={<UserProfileDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserProfileRoutes;
