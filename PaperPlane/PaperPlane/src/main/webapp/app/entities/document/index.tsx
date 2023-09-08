import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Document from './document';
import DocumentDetail from './document-detail';
import DocumentUpdate from './document-update';
import DocumentDeleteDialog from './document-delete-dialog';

const DocumentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Document />} />
    <Route path="new" element={<DocumentUpdate />} />
    <Route path=":id">
      <Route index element={<DocumentDetail />} />
      <Route path="edit" element={<DocumentUpdate />} />
      <Route path="delete" element={<DocumentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DocumentRoutes;
