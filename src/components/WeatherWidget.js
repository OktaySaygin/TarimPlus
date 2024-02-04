import React from "react";
import { TouchableOpacity, View } from "react-native";
import NavigationService from "../navigation/NavigationService";
import routes from "../navigation/routes";
import { screenWidth } from "../utils";
import FastImage from "react-native-fast-image";
import Text from "../helpers/Text";
import LottieView from "lottie-react-native";

function WeatherWidget(props) {
  const getCurrentDay = () => {
    const date = new Date();
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[date.getDay()];
  }

  return (
    <TouchableOpacity onPress={() => {
      NavigationService.navigateToScreenName(routes.Weather, {items: props?.items})
      //props?.navigation?.navigate(routes.Weather, {items: generalState?.weatherData})
    }}>
      <View style={{width: (screenWidth - 120) / 2, aspectRatio: 1, borderRadius: 30, alignSelf: 'flex-end'}}>
        <FastImage
          source={require('../assets/backgrounds/weatherWidgetbackground.png')}
          style={{width: (screenWidth - 120) / 2, aspectRatio: 1, borderRadius: 30, justifyContent: 'space-evenly'}}
          resizeMode={'contain'}>
          <Text style={{color: 'white', marginLeft: 10}} size={16} type={'bold'}>{getCurrentDay()}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
              <Text style={{color: 'white'}} size={16} type={'bold'}>{props?.items?.main?.temp}°C</Text>
              <Text style={{color: 'white'}} size={12}>{parseInt(props?.items?.main?.temp_min)}°C/{parseInt(props?.items?.main?.temp_max)}°C</Text>
            </View>
            <FastImage
              source={{uri: "https://openweathermap.org/img/wn/" +props?.items?.weather[0].icon+ "@2x.png"}}
              style={{width: 60, aspectRatio: 1}}
              resizeMode={'contain'}/>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
            {/*<FastImage*/}
            {/*  source={require('../../assets/icons/location.png')}*/}
            {/*  style={{width: 16, aspectRatio: 1, marginRight: 2}}*/}
            {/*  resizeMode={'contain'}/>*/}
            <LottieView
              source={require("../assets/animatedIcons/wired-outline-18-location-pin.json")}
              style={{width: 22, height: 22, marginRight: 2}}
              loop={true}
              autoPlay={true}
              resizeMode={'contain'}
            />
            <Text style={{color: 'white'}} numberOflines={1} size={12}>{props?.items?.sys?.country}/{props?.items?.name}</Text>
          </View>

        </FastImage>
      </View>
    </TouchableOpacity>

  )
}

export default React.memo(WeatherWidget);
