import React, { useEffect, useRef, useState } from "react";
import {
  Modal, View, TouchableOpacity,
} from "react-native";
import Text from "../../helpers/Text";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import routes from "../../navigation/routes";
import { screenWidth, screenHeight } from "../../utils";
import NavigationService from "../../navigation/NavigationService";

const IntroPage = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal style={{width: '100%'}} visible={isVisible}>
      <FastImage
          source={require('../../assets/backgrounds/splashScreen.jpg')}
          style={{width: screenWidth, height: screenHeight, justifyContent: 'center'}}
          resizeMode={'cover'}/>
      <LinearGradient
        colors={['transparent', '#223420']}
        // start={{x: 0, y: 0}}
        // end={{x: 0, y: 1}}
        style={{
          bottom: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
      <View style={{marginHorizontal: 30, position: 'absolute', top: '40%', width: screenWidth - 60}}>
        <Text size={20} type={'bold'} style={{color: '#FFFFFF', width: 250}}>TarımPlus Uygulamasına Hoşgeldiniz</Text>
        <Text size={16} style={{color: '#FFFFFF', marginVertical: 20}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>

        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
            NavigationService.navigateToScreenName(routes.Register);
          }}
          style={{flex: 1, marginTop: 40, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 6}}>
          <Text size={18} type={'italicBold'} style={{color: '#FFFFFF'}}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
              setIsVisible(false);
              NavigationService.navigateToScreenName(routes.Login);
          }}
          style={{flex: 1, marginTop: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 6}}>
          <Text size={18} type={'italicBold'} style={{color: '#323C06'}}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
};
export default React.memo(IntroPage);
