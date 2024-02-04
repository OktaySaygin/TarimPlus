import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { fetchMyAPIPost, getThemeColor, imageSource, screenWidth } from "../../utils";
import Text from "../../helpers/Text";
import routes from "../../navigation/routes";
import NavigationService from "../../navigation/NavigationService";

const Register = (props) => {
  const [generalState, setGeneralState] = useState({
    name: "",
    secondName: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleSignIn = () => {
    console.warn("ehehe: ", generalState?.email, generalState?.password ,generalState?.name, generalState?.secondName, generalState?.phone)
    fetchMyAPIPost("/sign-up", generalState?.email, generalState?.password,
      generalState?.name, generalState?.secondName, generalState?.phone).then(response => {
      if (response.status) {
        NavigationService.navigateToScreenName(routes.Login);
      }
      else {
        console.warn("hatali giris")
      }
    })
  }

  const input = (textName) => {
    return (
      <View style={{width: screenWidth - 60, backgroundColor: '#F8FAF8', paddingLeft: 20, marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
        {imageSource(textName)}
        <TextInput
          autoCapitalize = {(textName === "Email" || textName === "Şifre") ? "none" : undefined}
          secureTextEntry={textName === 'Şifre'}
          style={{color: 'gray', width: '100%'}}
          placeholder={textName + '...'}
          onChangeText={(query) => {
            switch (textName) {
              case 'Name':
                setGeneralState(prevState => {
                  return {
                    ...prevState,
                    name: query
                  }
                });
                break;
              case 'SecondName':
                setGeneralState(prevState => {
                  return {
                    ...prevState,
                    secondName: query
                  }
                });
                break;
              case 'Email':
                setGeneralState(prevState => {
                  return {
                    ...prevState,
                    email: query
                  }
                });
                break;
              case 'Phone':
                setGeneralState(prevState => {
                  return {
                    ...prevState,
                    phone: query
                  }
                });
                break;
              case 'Şifre':
                setGeneralState(prevState => {
                  return {
                    ...prevState,
                    password: query
                  }
                });
                break;
            }
          }}
        />
      </View>
    )
  }
  return (
    <View style={{marginHorizontal: 30}}>
      <Text size={20} type={'bold'} style={{marginTop: 80}}>TarımPlus'a Üye Ol</Text>
      <Text style={{marginTop: 20}}>Create an Aepod account, We can't wait to have you</Text>
      {input('Name')}
      {input('SecondName')}
      {input('Email')}
      {input('Phone')}
      {input('Şifre')}
      {/*{input('Tekrar Şifre')}*/}

      <BouncyCheckbox
        style={{marginTop: 20}}
        size={25}
        fillColor="#5B8E55"
        unfillColor="#FFFFFF"
        text="I Agree to the term and condition"
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: "PT-Regular", fontSize: 14, marginLeft: -10 }}
        onPress={(isChecked) => {}}
      />
      <TouchableOpacity
        style={{width: screenWidth - 60, alignItems: 'center', justifyContent: 'center', backgroundColor: getThemeColor(props?.isDarkMode), paddingVertical: 14, marginTop: 20, borderRadius: 10}}
        onPress={() => {
          handleSignIn()
        }}>
        <Text size={18} type={'italicBold'} style={{color: 'white'}}>Kayıt Ol</Text>
      </TouchableOpacity>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <Text style={{fontSize: 12}} color={'red'}>Hesabınız varsa giriş yapın</Text>
        <TouchableOpacity onPress={() => NavigationService.navigateToScreenName(routes.Login)}>
          <Text size={12} style={{textDecorationLine: 'underline', marginLeft: 20, color: getThemeColor(props?.isDarkMode)}}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default React.memo(Register);
