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

  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/navigator/AppContainer';
import store from './src/state/Store';
import { Provider } from 'react-redux';




const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>

      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContainer />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
