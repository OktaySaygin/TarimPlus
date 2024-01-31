import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Text from "../../helpers/Text";
import { fetchMyAPI, getPermission, getThemeColor, screenWidth } from "../../utils";
import Container from "../../helpers/Container";
import FastImage from "react-native-fast-image";
import MainSlider from "../../components/MainSlider";
import routes from "../../navigation/routes";
//import Geolocation from "react-native-geolocation-service";
import Geolocation from '@react-native-community/geolocation';
import store from "../../store";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "../../navigation/NavigationService";
import { setProfileData, setProfileGarden } from "./store/homeReducer";

const Home = (props) => {
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const dispatch = useDispatch();
  const [generalState, setGeneralState] = useState({
    homeData: null,
    weatherData: null,
    gardenData: null,
    lati: "",
    long: "",
  });

  async function fetchDataWeather() {
    getPermission().then((result)=> {
      if (result){
        try {
          Geolocation.getCurrentPosition(
            async (position) => {
              setGeneralState(prevState => {
                return {
                  ...prevState,
                  lati: position.coords.latitude,
                  long: position.coords.longitude,
                }
              })
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

  const checkGarden = async () => {
    try {
      const result = await fetchMyAPI("/the_field", profileData?.data[0]?.token);
      setGeneralState(prevState => {
        return {
          ...prevState,
          gardenData: result,
        };
      });
      let garden = result?.items?.find((value) => value.userId === profileData?.data[0].findUser?.id);
      if (garden !== undefined) {
        // store.dispatch(setProfileGarden({data: garden}));
        dispatch(setProfileGarden({data: garden}));
        NavigationService.navigateToScreenName(routes.MyGardenPage, {data: garden})
        //props?.navigation?.push(routes.MyGardenPage, {data: garden});
      }
      console.warn("data: ",garden)
    } catch (err) {
      console.warn("err: ",err)
    }
    // props?.navigation?.push(routes.Garden)
  }

  const getCurrentDay = () => {
    const date = new Date();
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[date.getDay()];
  }

  const WeatherWidget = () => {
    console.warn("data: ",generalState?.weatherData?.weather[0].main);
    return (
      <TouchableOpacity onPress={() => {
        props?.navigation?.navigate(routes.Weather, {items: generalState?.weatherData})
      }}>
        <View style={{width: (screenWidth - 120) / 2, aspectRatio: 1, borderRadius: 30, alignSelf: 'flex-end'}}>
          <FastImage
            source={require('../../assets/backgrounds/weatherWidgetbackground.png')}
            style={{width: (screenWidth - 120) / 2, aspectRatio: 1, borderRadius: 30, justifyContent: 'space-evenly'}}
            resizeMode={'contain'}>
            <Text style={{color: 'white', marginLeft: 10}} size={16} type={'bold'}>{getCurrentDay()}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
              <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Text style={{color: 'white'}} size={16} type={'bold'}>{generalState?.weatherData?.main?.temp}°C</Text>
                <Text style={{color: 'white'}} size={12}>{parseInt(generalState?.weatherData?.main?.temp_min)}°C/{parseInt(generalState?.weatherData?.main?.temp_max)}°C</Text>
              </View>
              <FastImage
                source={{uri: "https://openweathermap.org/img/wn/" +generalState?.weatherData?.weather[0].icon+ "@2x.png"}}
                style={{width: 60, aspectRatio: 1}}
                resizeMode={'contain'}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
              <FastImage
                source={require('../../assets/icons/location.png')}
                style={{width: 16, aspectRatio: 1, marginRight: 2}}
                resizeMode={'contain'}/>
              <Text style={{color: 'white'}} numberOflines={1} size={12}>{generalState?.weatherData?.sys?.country}/{generalState?.weatherData?.name}</Text>
            </View>

          </FastImage>
        </View>
      </TouchableOpacity>

    )
  }

  const navigateWidget = () => {
    return (
      <View style={{marginTop: 20}}>

        <TouchableOpacity
          onPress={() => NavigationService.navigateToScreenName(routes.Medicine)}
          style={{width: screenWidth - 40, height: 80, flexDirection: 'row', marginBottom: 15, backgroundColor: '#BDCC90', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', elevation: 6}}>
          <FastImage
            source={require('../../assets/icons/ilacImage.png')}
            style={{width: 70, aspectRatio: 1}}
            resizeMode={'contain'}/>
          <Text style={{color: 'white', width: 180, paddingHorizontal: 20}} size={18} type={'bold'}>TarımPlus'tan İlaçlarım</Text>
          <FastImage
            source={require('../../assets/icons/arrowRight.png')}
            style={{width: 30, aspectRatio: 1}}
            resizeMode={'contain'}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            checkGarden();

          }}
          style={{width: screenWidth - 40, height: 80, flexDirection: 'row', marginBottom: 15, backgroundColor: '#7a662c', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', elevation: 6}}>
          <FastImage
            source={require('../../assets/icons/tarlamImage.png')}
            style={{width: 70, aspectRatio: 1, marginBottom: 10}}
            resizeMode={'contain'}/>
          <Text style={{color: 'white', width: 180, paddingHorizontal: 20}} size={18} type={'bold'}>TarımPlus'tan Tarlam</Text>
          <FastImage
            source={require('../../assets/icons/arrowRight.png')}
            style={{width: 30, aspectRatio: 1}}
            resizeMode={'contain'}/>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => props?.navigation?.push(routes.VegetableMarket)}
          style={{width: screenWidth - 40,marginBottom: 10, height: 80, flexDirection: 'row', backgroundColor: '#90CCB7', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', elevation: 4}}>
          <FastImage
            source={require('../../assets/icons/halImage.png')}
            style={{width: 70, aspectRatio: 1}}
            resizeMode={'contain'}/>
          <Text style={{color: 'white', width: 180, paddingHorizontal: 20}} size={18} type={'bold'}>TarımPlus'tan Hal Durumu</Text>
          <FastImage
            source={require('../../assets/icons/arrowRight.png')}
            style={{width: 30, aspectRatio: 1}}
            resizeMode={'contain'}/>
        </TouchableOpacity>

      </View>
    )
  }


  if (!generalState?.homeData) {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <Container>
      <ScrollView style={{marginHorizontal: 20}} showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <Text size={22} type={'italicBold'} style={{color: getThemeColor(false)}}>TarımPlus</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: -15, marginBottom: 5}}>
          <View style={{flexDirection: 'row', width: (screenWidth - 40) / 2, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => props?.navigation?.push(routes.Profile)}
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
            {WeatherWidget()}
          </View>
        </View>

        <MainSlider item={generalState?.homeData} navigation={props?.navigation} />

        {navigateWidget()}

        <View style={{width: '100%', height: 70, backgroundColor: 'white'}}/>
      </ScrollView>
    </Container>
  );


};
export default React.memo(Home);
