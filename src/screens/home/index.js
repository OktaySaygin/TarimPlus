import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar } from "react-native";
import Text from "../../helpers/Text";
import { fetchMyAPI, getPermission, getThemeColor, screenWidth } from "../../utils";
import Container from "../../helpers/Container";
import FastImage from "react-native-fast-image";
import MainSlider from "../../components/MainSlider";
import routes from "../../navigation/routes";
//import Geolocation from "react-native-geolocation-service";
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "../../navigation/NavigationService";
import { setDarkMode, setProfileData, setProfileGarden } from "./store/homeReducer";
import switchTheme from "react-native-theme-switch-animation";
import WeatherWidget from "../../components/WeatherWidget";
import NavigateWidget from "../../components/NavigateWidget";

function Home(props) {
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);
  const dispatch = useDispatch();
  const [generalState, setGeneralState] = useState({
    homeData: null,
    weatherData: null
  });

  async function fetchDataWeather() {
    getPermission().then((result)=> {
      if (result){
        try {
          Geolocation.getCurrentPosition(
            async (position) => {
              console.warn("asdasd: ",position.coords.latitude)
              const result = await fetchMyAPI("/get-weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, profileData?.data[0]?.token);
              setGeneralState(prevState => {
                return {
                  ...prevState,
                  weatherData: result.results,
                };
              });
            },
            (error) => {
              // See error code charts below.
              //console.warn(error.code, error.message);
            },
            {enableHighAccuracy: true}
          );
        } catch (e) {
          console.warn("err: ",e)
        }
      }
    });

  }

  async function fetchData() {
    try {
      const result = await fetchMyAPI("/content", profileData?.data[0]?.token);
      setGeneralState(prevState => {
        return {
          ...prevState,
          homeData: result,
        };
      });
    } catch (err) {
      console.warn("err: ",err)
    }
  }

  useEffect( () => {
    fetchData();
    fetchDataWeather();
    return () => {
      // setGeneralState(null);
    };
  }, []);

  if (!generalState?.homeData) {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <Container>
      <StatusBar barStyle={darkModeEnable ? "light-content" : "dark-content"}  hidden = {false} backgroundColor={darkModeEnable ? '#131313' : "#f3f3f3"} animated={true}/>
      <ScrollView style={{marginHorizontal: 20}} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => {
          switchTheme({
            switchThemeFunction: () => {
              dispatch(setDarkMode(!darkModeEnable));
             // setTheme(theme === 'light' ? 'dark' : 'light'); // your switch theme function
            },
            animationConfig: {
              type: 'circular',
              duration: 900,
              startingPoint: {
                cxRatio: 0.2,
                cyRatio: 0.1
              }
            },
          });
        }} style={{padding: 5}}>
          <Text size={22} type={'italicBold'} style={{color: getThemeColor(false)}}>TarımPlus</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: -15, marginBottom: 5}}>
          <View style={{flexDirection: 'row', width: (screenWidth - 40) / 2, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => NavigationService.navigateToScreenName(routes.Profile)}
              style={{alignItems: 'center', width: 90}}>
              <View style={{width: 50, aspectRatio: 1, borderRadius: 50}}>
                <FastImage
                  style={{
                    width: 34,
                    aspectRatio: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                  }}
                  resizeMode={'contain'}
                  source={require('../../assets/icons/profile2.png')}/>
              </View>
              <Text style={{color: getThemeColor(false), marginTop: 10}}>Profilim</Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', width: 90}}>
              <TouchableOpacity
                // onPress={() => props?.navigation?.push(routes?.ChatPage)}
                style={{width: 50, aspectRatio: 1, borderRadius: 50}}>
                <FastImage
                  style={{
                    width: 34,
                    aspectRatio: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                  }}
                  resizeMode={'contain'}
                  source={require('../../assets/icons/shop.png')}/>
              </TouchableOpacity>
              <Text style={{color: getThemeColor(false), marginTop: 10}}>Hal</Text>
            </View>
          </View>

          <View style={{width: (screenWidth - 40) / 2}}>
            <WeatherWidget items={generalState?.weatherData}/>
          </View>
        </View>

        <MainSlider item={generalState?.homeData} />

        <NavigateWidget/>

      </ScrollView>
    </Container>
  );


};
export default React.memo(Home);
