import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import Text from '../../helpers/Text';
import {
  fetchMyAPIPost,
  getThemeColor,
  imageSource,
  screenWidth,
} from '../../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import store from '../../store';
import {setProfile} from './store/action';
import routes from '../../navigation/routes';
import {setProfileData} from '../home/store/homeReducer';
import {useDispatch} from 'react-redux';

const Login = props => {
  const dispatch = useDispatch();
  const [generalState, setGeneralState] = useState({
    email: 'yusufdede95@hotmail.com',
    password: 'dede123qwe',
  });

  const input = textName => {
    return (
      <View
        style={{
          width: screenWidth - 60,
          backgroundColor: '#F8FAF8',
          paddingLeft: 20,
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {imageSource(textName)}
        <TextInput
          autoCapitalize={'none'}
          secureTextEntry={textName === 'Şifre'}
          style={{color: 'gray', width: '100%'}}
          placeholder={textName + '...'}
          onChangeText={query => {
            if (textName === 'Email') {
              setGeneralState(prevState => {
                return {
                  ...prevState,
                  email: query,
                };
              });
            } else {
              setGeneralState(prevState => {
                return {
                  ...prevState,
                  password: query,
                };
              });
            }
          }}
        />
      </View>
    );
  };

  const handleSignUp = () => {
    fetchMyAPIPost('/login', generalState?.email, generalState?.password).then(
      response => {
        console.warn(response);
        if (response.status) {
          dispatch(setProfileData({data: response.body}));
          //store.dispatch(setProfile({data: response.body}));
          NavigationService.navigateToScreenName(routes.HomePage);
        } else {
          console.warn('hatali giris');
        }
      },
    );
  };

  return (
    <View style={{marginHorizontal: 30, flex: 1, justifyContent: 'center'}}>
      <Text size={22} type={'italicBold'}>
        TarımPlus'a Giriş Yap
      </Text>
      <Text style={{marginTop: 20}}>
        Create an Aepod account, We can't wait to have you
      </Text>
      {input('Email')}
      {input('Şifre')}
      <BouncyCheckbox
        style={{marginTop: 20}}
        size={20}
        fillColor="#5B8E55"
        unfillColor="#FFFFFF"
        text="Beni Hatırla"
        innerIconStyle={{borderWidth: 2}}
        textStyle={{fontFamily: 'PT-Regular', fontSize: 14, marginLeft: -10}}
        onPress={isChecked => {}}
      />
      <TouchableOpacity
        style={{
          width: screenWidth - 60,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: getThemeColor(props?.isDarkMode),
          paddingVertical: 14,
          marginTop: 20,
          borderRadius: 10,
        }}
        onPress={() => {
          handleSignUp();
        }}>
        <Text style={{color: 'white'}} size={18} type={'bold'}>
          Giriş Yap
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <Text style={{fontSize: 12}} color={'red'}>
          Hesabınız yoktuur o zaman kayıt ola
        </Text>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigateToScreenName(routes.Register)
          }>
          <Text
            size={12}
            style={{
              textDecorationLine: 'underline',
              marginLeft: 20,
              color: getThemeColor(props?.isDarkMode),
            }}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default React.memo(Login);
