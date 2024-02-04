/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import AppWithNavigationWrapper from './src/navigation/AppNavigator';
import {Provider} from "react-redux";
import store from './src/store';
// import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import {request, PERMISSIONS} from 'react-native-permissions';
const App = () => {
  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      // console.warn("ehe: ",result)
    });
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      // console.warn("ehe: ",result)
    });
  }, []);


  // SplashScreen.hide();
  return (
    <Provider store={store}>
      <AppWithNavigationWrapper />
    </Provider>
  );
};

export default App;
