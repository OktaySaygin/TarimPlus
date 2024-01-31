import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import routes from "./routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {SafeAreaView} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import NewsPage from "../screens/news";
import Login from "../screens/login";
import Medicine from "../screens/medicine";
import ChatPage from "../screens/chat";
import MessagePage from "../screens/message";
import Settings from "../screens/settings";
import Camera from "../screens/camera";
import Agro from "../screens/agro";
import VegetableMarket from "../screens/vegetableMarket";
import Blog from "../screens/blog";
import Register from "../screens/register";
import Profile from "../screens/profile";
import Weather from "../screens/weather";
import Garden from '../screens/garden';
import MyGardenPage from '../screens/myGarden';
import HomePage from "../screens/home";
import IntroPage from "../screens/intro";
import TabBar from "../components/TabBar";
import { navigationRef } from "./NavigationService";
const Tab = createBottomTabNavigator();
function App() {
  function HomeStackScreen({navigation, route}) {
    return (
      <GestureHandlerRootView style={{height: '100%'}}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Group>
                <Stack.Screen name={routes.IntroPage} component={IntroPage}/>
                <Stack.Screen name={routes.Login} component={Login}/>
                <Stack.Screen name={routes.Register} component={Register} />
              </Stack.Group>

              <Stack.Group>
                <Stack.Screen name={routes.HomePage} component={HomePage}/>

                <Stack.Screen name={routes.Garden} component={Garden} options={{animation: 'flip', gestureEnabled: true}}/>
                <Stack.Screen name={routes.MyGardenPage} component={MyGardenPage} options={{animation: 'flip'}}/>
                <Stack.Screen name={routes.Medicine} component={Medicine}/>
                {/*<Stack.Screen name={routes.Agro} component={Agro} />*/}
                {/*<Stack.Screen name={routes.VegetableMarket} component={VegetableMarket} />*/}
                {/*<Stack.Screen name={routes.Blog} component={Blog} />*/}
                {/*<Stack.Screen name={routes.Settings} component={Settings}/>*/}
                <Stack.Screen name={routes.NewsPage} component={NewsPage} />
                {/*<Stack.Screen name={routes.ChatPage} component={ChatPage} />*/}
                {/*<Stack.Screen name={routes.MessagePage} component={MessagePage} />*/}
              </Stack.Group>
              {/*<Stack.Group>*/}
              {/*  <Stack.Screen name={routes.Profile} component={Profile} options={{presentation: "fullScreenModal"}}/>*/}
              {/*  <Stack.Screen name={routes.Camera} component={Camera} options={{presentation: "fullScreenModal"}}/>*/}
              {/*  <Stack.Screen name={routes.Weather} component={Weather} options={{presentation: "fullScreenModal"}}  />*/}
              {/*</Stack.Group>*/}
            </Stack.Navigator>
      </GestureHandlerRootView>
    );
  }

  return (
    <SafeAreaProvider>
      {/*<SafeAreaView*/}
      {/*  edges={["top"]}*/}
      {/*  style={{ flex: 0, backgroundColor: "#f6f6f6" }}*/}
      {/*/>*/}
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator tabBar={props => <TabBar {...props} />}
                         screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeStack" component={HomeStackScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();
export default React.memo(App)
