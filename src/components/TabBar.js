import React, { useState } from "react";
import { TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import NavigationService from "../navigation/NavigationService";
import routes from "../navigation/routes";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
function TabBar(props) {
  const [homeClicked, setHomeClicked] = useState(false);
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);
  const tempArr = props?.state?.routes;
  const tabBarVal = tempArr[0]?.state?.routes[tempArr[0]?.state?.index]?.params?.tabBarVal;

  if (tabBarVal === 1 || tabBarVal === undefined) {

    return (
    <View style={{width: '100%', alignItems: 'center', marginTop: -20}}>
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigateToScreenName(routes.Camera);
        }}
        style={{width: 56, height: 56, backgroundColor: '#5B8E55', position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginTop: -40, borderRadius: 56}}>
        <LottieView
          source={require("../assets/animatedIcons/wired-outline-61-camera.json")}
          style={{width: 42, height: 42}}
          loop={false}
          autoPlay={homeClicked}
          resizeMode={'contain'}
          onAnimationFinish={() => setHomeClicked(false)}
        />
      </TouchableOpacity>

      <FastImage
        source={darkModeEnable ? require('../assets/backgrounds/blackTabBarBackground.png') : require('../assets/backgrounds/tabBarBackground.png')}
        style={{
          width: '125%',
          height: 80,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        resizeMode={'cover'}>
        <View style={{flexDirection: 'row', width: '70%', justifyContent: 'space-between', marginTop: -10}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setHomeClicked(true);
              NavigationService.navigateToScreenName(routes.HomePage);
            }}>
            <LottieView
              source={require("../assets/animatedIcons/system-solid-41-home.json")}
              style={{width: 42, height: 42}}
              loop={false}
              autoPlay={homeClicked}
              resizeMode={'contain'}
              onAnimationFinish={() => setHomeClicked(false)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setHomeClicked(true);
              NavigationService.navigateToScreenName(routes.HomePage);
            }}>
            <FastImage
              style={{
                width: 38,
                aspectRatio: 1
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/chat.png')} />
          </TouchableOpacity>

          <View style={{width: 42, height: 42}}/>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setHomeClicked(true);
              NavigationService.navigateToScreenName(routes.HomePage);
            }}>
            <FastImage
              style={{
                width: 38,
                aspectRatio: 1
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/cart.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setHomeClicked(true);
              NavigationService.navigateToScreenName(routes.HomePage);
            }}>
            <FastImage
              style={{
                width: 34,
                aspectRatio: 1
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/search.png')} />
          </TouchableOpacity>
        </View>

      </FastImage>
    </View>
    );
  }
  return null;
}

export default React.memo(TabBar);
