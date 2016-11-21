import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import ChatPage from './ChatPage';

export default (
  <Route
    path="/"
    component={Layout}
  >
    <IndexRoute
      component={ChatPage}
    />
  </Route>
);
