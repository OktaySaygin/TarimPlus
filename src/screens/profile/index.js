import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View } from "react-native";
import Text from "../../helpers/Text";
import {bindActionCreators} from 'redux';
import { connect, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { screenWidth, solidLine } from "../../utils";
import routes from "../../navigation/routes";
import NavigationService from "../../navigation/NavigationService";

const Profile = (props) => {
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);

  return (
      <View style={{flex: 1, backgroundColor: '#5B8E55', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', height: '30%'}}>
          <FastImage
            source={require('../../assets/icons/mainLogo.png')}
            style={{width: 100, aspectRatio: 1}}
            resizeMode={'contain'}/>
        </View>
        <View style={{width: '100%', height: '70%', paddingHorizontal: 20, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, justifyContent: 'center'}}>
          <View style={{aspectRatio: 1, width: 120, backgroundColor: 'white', top: -60, borderRadius: 120, position: 'absolute', right:(screenWidth / 2)-60, }}>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={require('../../assets/icons/profile.png')}
              style={{width: 30, aspectRatio: 1, marginRight: 10}}
              resizeMode={'contain'}/>
            <Text style={{marginVertical: 10}} size={16}>{profileData?.data[0]?.findUser?.firstName} {profileData?.data[0]?.findUser?.lastName}</Text>
          </View>
          {solidLine(darkModeEnable)}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={require('../../assets/icons/email.png')}
              style={{width: 30, aspectRatio: 1, marginRight: 10}}
              resizeMode={'contain'}/>
            <Text style={{marginVertical: 10}} size={16}>{profileData?.data[0]?.findUser?.email}</Text>
          </View>
          {solidLine(darkModeEnable)}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={require('../../assets/icons/mobile.png')}
              style={{width: 30, aspectRatio: 1, marginRight: 10}}
              resizeMode={'contain'}/>
            <Text style={{marginVertical: 10}} size={16}>{profileData?.data[0]?.findUser?.phoneNumber}</Text>
          </View>
          {solidLine(darkModeEnable)}
          <TouchableOpacity
            onPress={() => NavigationService.replaceWithPageName(routes.Login)}
            style={{width: '85%', borderRadius: 20, height: 45, marginTop: 60, backgroundColor: '#5B8E55', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'white', fontSize: 16}} size={18} type={'italicBold'}>ÇIKIŞ YAP</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};
export default React.memo(Profile);

