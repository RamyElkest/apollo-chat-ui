import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';
// Polyfill fetch
import 'isomorphic-fetch';

import './style/index.css';

import routes from './routes';
import createApolloClient from './helpers/create-apollo-client';
import addGraphQLSubscriptions from './helpers/subscriptions';

const wsClient = new Client('ws://localhost:8080');

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100,
});

render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </ApolloProvider>
), document.getElementById('content'));
