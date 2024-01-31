/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppWithNavigationWrapper from './src/navigation/AppNavigator';
import {Provider} from "react-redux";
import store from './src/store';
// import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
const App = () => {
  // SplashScreen.hide();
  return (
    <Provider store={store}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#f3f3f3"/>
      <AppWithNavigationWrapper />
    </Provider>
  );
};

export default App;
