import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View } from "react-native";
import Text from "../../helpers/Text";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FastImage from "react-native-fast-image";
import { solidLine } from "../../utils";
import routes from "../../navigation/routes";

const Profile = (props) => {

  return (
      <View style={{flex: 1, backgroundColor: '#5B8E55', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', height: '30%'}}>
          <FastImage
            source={require('../../assets/icons/mainLogo.png')}
            style={{width: 100, aspectRatio: 1}}
            resizeMode={'contain'}/>
        </View>
        <View style={{width: '100%', height: '70%', paddingHorizontal: 20, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, justifyContent: 'center'}}>
          <View style={{aspectRatio: 1, width: 120, backgroundColor: 'white', top: -60, borderRadius: 120, position: 'absolute', right:(props?.screenWidth / 2)-60, }}>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={require('../../assets/icons/profile.png')}
              style={{width: 30, aspectRatio: 1, marginRight: 10}}
              resizeMode={'contain'}/>
            <Text style={{marginVertical: 10}} size={16}>{props?.profileData?.data[0]?.findUser?.firstName} {props?.profileData?.data[0]?.findUser?.lastName}</Text>
          </View>
          {solidLine(props?.isDarkMode)}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={require('../../assets/icons/email.png')}
              style={{width: 30, aspectRatio: 1, marginRight: 10}}
              resizeMode={'contain'}/>
            <Text style={{marginVertical: 10}} size={16}>{props?.profileData?.data[0]?.findUser?.email}</Text>
          </View>
          {solidLine(props?.isDarkMode)}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={require('../../assets/icons/mobile.png')}
              style={{width: 30, aspectRatio: 1, marginRight: 10}}
              resizeMode={'contain'}/>
            <Text style={{marginVertical: 10}} size={16}>{props?.profileData?.data[0]?.findUser?.phoneNumber}</Text>
          </View>
          {solidLine(props?.isDarkMode)}
          <TouchableOpacity
            onPress={() => props?.navigation?.replace(routes.Login)}
            style={{width: '85%', borderRadius: 20, height: 45, marginTop: 60, backgroundColor: '#5B8E55', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'white', fontSize: 16}} size={18} type={'italicBold'}>ÇIKIŞ YAP</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );

const mapStateToProps = state => {
  return {
    isDarkMode: state.homePage.isDarkMode,
    profileData: state.loginPage.profileData,
    screenWidth: state.homePage.screenWidth
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Profile));

