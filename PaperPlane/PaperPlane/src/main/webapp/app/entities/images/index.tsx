import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Images from './images';
import ImagesDetail from './images-detail';
import ImagesUpdate from './images-update';
import ImagesDeleteDialog from './images-delete-dialog';

const ImagesRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Images />} />
    <Route path="new" element={<ImagesUpdate />} />
    <Route path=":id">
      <Route index element={<ImagesDetail />} />
      <Route path="edit" element={<ImagesUpdate />} />
      <Route path="delete" element={<ImagesDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ImagesRoutes;
