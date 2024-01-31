import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import NavigationService from "../navigation/NavigationService";
import routes from "../navigation/routes";
import {getThemeColor, getThemeColorV2} from "../utils";
import Icon from "./Icon";

const HeaderLeft = (props) => (

    <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={() => {
            if (props?.route.name === routes.HomePage) {
              props?.navigation?.navigateModal(routes.LoginModal);
                //console.warn('Search touch');
                // NavigationService.navigate('ModalStack', {
                //   screen: routes.SearchModal,
                // });
            } else {
                //console.warn('a touch', route.name);
                NavigationService.goBack();
            }
        }}>
            <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  width: 40,
                  borderRadius: 100,
                  alignItems: 'center',
                  backgroundColor: 'green'
                }}>
              <Text>OS</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const HeaderRight = (props) => (
    <TouchableOpacity onPress={() => props?.navigation?.push(routes.Settings)}>
        <View
            style={{
              flex: 1,
              paddingRight: 15,
              justifyContent:'center',
              alignItems: 'center',
            }}>
          <FastImage
            source={require('../assets/icons/settings.png')}
            style={{      width: 30,
              aspectRatio: 1}}
          />
        </View>
    </TouchableOpacity>
);

const Logo = () => (
    <TouchableOpacity
        onPress={() => {
          if (NavigationService.getCurrentRouteName() === routes.HomePage){
            NavigationService.replaceWithPageName('MainStack', {
              screen: routes.HomePage,
            });
          } else {
            NavigationService.popToTop();
          }
        }}
        style={[
            {
                bottom: -10,
                left: '50%',
                width: 70,
                zIndex: 100,
                //padding: 6,
                position: 'absolute',
                marginLeft: -25,
                elevation: 4,
            },
        ]}>
        <FastImage
            source={require('../assets/icons/homeLogo.png')}
            style={{      width: 60,
                bottom: 0,
                aspectRatio: 1}}
        />
    </TouchableOpacity>
);

function Header(props) {
    const {route, navigation} = props;
        return (
          <View>
            {/*<StatusBar barStyle={"dark-content"} backgroundColor={'white'}  />*/}
            <View
                style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 50,
                    //backgroundColor: this.props.useDynamicValue('#1E1E1E', 'white'),
                    backgroundColor: getThemeColor(props?.isDarkMode)
                }}>
                <View
                    style={{
                        width: '100%',
                        height: 40,
                        alignSelf: 'center',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowRadius: 4.65,
                        shadowOpacity: 0.27,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: props?.isDarkMode ? '#1F2937' : '#FFFFFF',
                        backgroundColor: getThemeColorV2(props?.isDarkMode),
                        //borderBottomLeftRadius: 10,
                        //borderBottomRightRadius: 10,
                        elevation: 8,
                        shadowColor: props?.isDarkMode ? '#374151' : 'black'
                    }}>
                    <HeaderLeft route={route} navigation={navigation} props={props} />
                    <HeaderRight/>
                </View>
                <Logo />
            </View>
        </View>
)
}
export default React.memo(Header);
