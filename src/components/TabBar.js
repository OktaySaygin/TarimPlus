import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { getGrayColor, screenWidth } from "../utils";
import NavigationService from "../navigation/NavigationService";
import routes from "../navigation/routes";
function TabBar(props) {
  return (
    <FastImage
      source={require('../assets/backgrounds/tabBackground.png')}
      style={{width: '100%', height: 40, backgroundColor: 'transparent'}}
      resizeMode={'cover'}/>
  )

  return (
    <View style={styles.container}>
      <View style={{}}>
        <View style={{

          height: 0,
          width: screenWidth,
          backgroundColor: 'transparent'}} />
        <View style={styles.ovalContainer}>
          <View style={{backgroundColor: 'white', position:  'absolute', top: 31, width: 100, aspectRatio: 1}}></View>
          <View style={styles.oval} />

        </View>
        <FastImage
          source={require('../assets/backgrounds/tabBackground.png')}
          style={{width: '100%', height: 40, position: 'absolute'}}
          resizeMode={'cover'}/>
        {/*<TouchableOpacity activeOpacity={1}*/}
        {/*                  onPress={() => {*/}
        {/*                    props?.item?.navigation?.navigate(routes.Camera);*/}
        {/*                  }} style={{alignItems: 'center', backgroundColor: '#5B8E55', position: 'absolute', zIndex: 1000, top: -30, right: (screenWidth/2) - 27, padding: 15, borderRadius: 100}}>*/}
        {/*  <FastImage*/}
        {/*    style={{*/}
        {/*      width: 24,*/}
        {/*      aspectRatio: 1,*/}
        {/*      alignSelf: 'center',*/}
        {/*      justifyContent: 'center',*/}
        {/*    }}*/}
        {/*    resizeMode={'contain'}*/}
        {/*    source={require('../assets/icons/scan.png')}/>*/}
        {/*</TouchableOpacity>*/}
        <View style={{flexDirection: 'row', width: screenWidth, position: 'absolute', top: 1, height: 80}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              NavigationService.navigateToScreenName(routes.HomePage);
            }} style={{flex: 0.2, alignItems: 'center', backgroundColor: 'white'}}>
            <FastImage
              style={{
                width: 38,
                aspectRatio: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/home2.png')}/>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                              NavigationService.navigateToScreenName(routes.MessagePage);
                            }} style={{flex: 0.2, alignItems: 'center', backgroundColor: 'white', borderTopRightRadius: 20, borderRightWidth: 1, borderTopRightColor: getGrayColor(props?.isDarkMode), borderTopRight: 1, borderRightColor: 'white', }}>
            <FastImage
              style={{
                width: 38,
                aspectRatio: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/chat.png')}/>
          </TouchableOpacity>
          <View style={{flex: 0.2}}></View>
          <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                              // props?.item?.navigation?.push(routes.Profile);
                            }} style={{flex: 0.2, alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 20, borderLeftWidth: 1, borderTopLeftColor: getGrayColor(props?.isDarkMode), borderTopLeft: 1, borderLeftColor: 'white', }}>
            <FastImage
              style={{
                width: 38,
                aspectRatio: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/cart.png')}/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                              NavigationService.navigateToScreenName(routes.Garden);
                            }} style={{flex: 0.2, alignItems: 'center', backgroundColor: 'white',}}>
            <FastImage
              style={{
                width: 34,
                aspectRatio: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 12,
              }}
              resizeMode={'contain'}
              source={require('../assets/icons/search.png')}/>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    // shadowColor: '#000000',
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
    // shadowOffset: {
    //   height: -1,
    //   width: 0,
    // },
    // elevation: 1,
  },
  ovalContainer: {
    width: 80, // Ovalin genişliği
    height: 60, // Ovalin yüksekliğinin yarısı
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  oval: {
    // shadowColor: '#000000',
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
    // shadowOffset: {
    //   height: -1,
    //   width: 0,
    // },
    // elevation: 1,
    // borderWidth: 1,
    // borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    backgroundColor: 'transparent',
    borderRadius: 100,
    marginTop: -77, // Ovalin yarısını gizlemek için
  },
});

export default React.memo(TabBar);
