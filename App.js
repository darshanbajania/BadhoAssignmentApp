/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SpaceXLaunchList from './ProjectFiles/SpaceXLaunchList';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://flyby-gateway.herokuapp.com/',
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  // cache: new InMemoryCache(),
  cache: new InMemoryCache(),
});

// const client = ...


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App: () => Node = () => {


  return (
    <ApolloProvider client={client}>
      <SpaceXLaunchList />
    </ApolloProvider>
  );
};


export default App;
