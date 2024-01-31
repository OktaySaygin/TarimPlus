import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Platform, ToastAndroid,
  View,
} from "react-native";
import ActivityIndicator from './ActivityIndicator';
import DeviceInfo from 'react-native-device-info';
import config from "../api/config";
import FastImage from "react-native-fast-image";
import Geolocation from "react-native-geolocation-service";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { WToast } from "react-native-smart-tip";

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_TABLET = DeviceInfo.isTablet();

export async function getPermission() {
  return check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.warn('This feature is not available (on this device / in this context)');
          return false;
        case RESULTS.DENIED:
          console.warn('The permission has not been requested / is denied but requestable');
          return false;
        case RESULTS.LIMITED:
          console.warn('The permission is limited: some actions are possible');
          return true;
        case RESULTS.GRANTED:
          console.warn('The permission is granted');
          return true;
        case RESULTS.BLOCKED:
          console.warn('The permission is denied and not requestable anymore');
          return false;
      }
    })
    .catch((error) => {
      console.warn("error getPerm")
      return false;
      // …
    });
}

export async function getLocation() {
  let obj;
  Geolocation.watchPosition(
    (position) => {
      console.warn("location: ", position?.coords)
      obj = position?.coords
      //return position.coords
    },
    (error) => {
      return null;
    },
    {enableHighAccuracy: true}
  )
  return obj;


}

export const splitUrlV2 = url => {
  if (url) {
    let a, b, type, subType, id = "";
    url?.split('/').map((item, index) => {
      switch (index) {
        case 0:
          a = item;
          break;
        case 1:
          b = item;
          break;
        case 2:
          type = item;
          id = item;
          break;
        case 3:
          subType = item;
          id += "/" + item + "/";
          break;
        default:
          id += item + "/";
          break;
      }
    });
    if (id.charAt(id.length - 1) === "/"){
      id = id.substring(0, id.length - 1); // sondaki / trimlemek için yapıldı.
    }

    //console.warn("OTHER PARAMS ", id);
    return {
      id,
      type,
      subType,
    };
  }
  return {};
};

// export const createToken = () => {
//   let t = new Date();
//   t.setSeconds(t.getSeconds() + 10);
//   let payload = {
//     "iss" : "https://haberturk.com/",
//     "exp" : t.getTime(),
//     "error" : null,
//     "data" :"",
//   }
//   let token = jwtSign(config.PRIVATE_KEY, payload);
//   return token;
// };

export async function fetchMyAPI2(id) {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(config.myAPI_URL + id, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function fetchMyAPI(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    'token': `${token}`
  };
  try {
    const response = await fetch(config.API_URL + id, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function fetchMyAPIPost(id, email, password, name="", secondName="", phone="") {
  let body;
  let status = false;
  let baseUrl = `${config.API_URL}`;
  let jsonFormat;
  if (name === "") {
    jsonFormat = JSON.stringify({
      email: email,
      password: password,
    });
  }
  else {
    jsonFormat = JSON.stringify({
      firstName: name,
      lastName: secondName,
      phoneNumber: phone,
      email: email,
      password: password,
    });
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: jsonFormat,

  };
  console.warn("asdasd: ",baseUrl + id)
  await fetch(baseUrl + id, requestOptions)
    .then(response => {
      const statusCode = response.status;
      console.warn("bak: ",statusCode)
      if (response.status === 200) {
        status = true;
        const data = response.json();
        return Promise.all([data]);
      }
      else if (response.status === 417) {
        return "Kullanici adi ya da şifre yanlis";
      }
      else if (response.status === 400) {
        return "Şifre yanlis";
      }
      else {
        return "Hatali giriş";
      }
    })
    .then((data) => {
      body = data;
      console.warn(body);
  })
  .catch(error => {
    ToastAndroid.show("errorCode: ",error)
    console.error("er: ",error);
    body = "Hatali giriş"
  });
  return {body: body, status: status};

}

export const apiFetching = (props, data) => {
  const {isFetching = true, error = null} = props;
  let response = (
    // <DynamicView style={styles.indicatorContainer}>
    getActivityIndicator()
  );
  if (error || props == undefined || props == null) {
    //NavigationService.goBack();
    // setTimeout(NavigationService.goBack, 300);
    response = (
      <View style={{flex: 1}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return {
    success: (!isFetching && !error) || data,
    response,
  };
};

export const solidLine = (isDarkMode) => {
  return (
    <View
      style={{
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 1,
        borderColor: getThemeColorV5(isDarkMode),
        marginVertical: 10,
      }}
    />
  );
};
export const solidLineDotted = (isDarkMode) => {
  return (
    <View
      style={{
        borderStyle: 'dashed',
        borderWidth: 0.7,
        borderRadius: 1,
        borderColor: getThemeColorV5(isDarkMode),
        marginVertical: 10,
      }}
    />
  );
};
export const solidVerticalLine = (isDarkMode) => {
  return (
    <View
      style={{
        width: 1,
        height: '100%',
        borderStyle: 'solid',
        borderWidth: 0.4,
        marginHorizontal: 15,
        borderColor: getThemeColorV5(isDarkMode),
      }}
    />
  );
};

export const imageSource = (textName) => {
  switch (textName) {
    case 'Name':
    case 'SecondName':
      return (
        <FastImage source={require('../assets/icons/profile.png')} style={{width: 20, aspectRatio: 1, marginRight: 10}} resizeMode={'contain'}/>
      )
    case 'Email':
      return (
        <FastImage source={require('../assets/icons/email.png')} style={{width: 20, aspectRatio: 1, marginRight: 10}} resizeMode={'contain'}/>
      )
    case 'Phone':
      return (
        <FastImage source={require('../assets/icons/mobile.png')} style={{width: 20, aspectRatio: 1, marginRight: 10}} resizeMode={'contain'}/>
      )
    case 'Şifre':
    case 'Tekrar Şifre':
      return (
        <FastImage source={require('../assets/icons/key.png')} style={{width: 20, aspectRatio: 1, marginRight: 10}} resizeMode={'contain'}/>
      )
  }
}

export const getThemeColor = (isDarkMode) => {
  return isDarkMode ? '#C5F5D7' : '#229064';
};

export const getThemeColorV2 = (isDarkMode) => {
  return isDarkMode ? '#1F2937' : '#FFFFFF';
};

export const getThemeColorV3 = (isDarkMode) => {
  return isDarkMode ? '#1F2937' : '#e5e7eb';
};

export const getThemeColorV4 = (isDarkMode) => {
  return isDarkMode ? '#374151' : '#FEF3C8';
};

export const getThemeColorV5 = (isDarkMode) => {
  return isDarkMode ? '#374151' : '#DEDEDE';
};

export const getPlaceholderColor = (isDarkMode) => {
  return isDarkMode ? '#9CA3AF' : '#000';
};

export const getIconColor = (isDarkMode) => {
  return isDarkMode ? 'white' : 'black';
};

export const getGrayColor = (isDarkMode) => {
  return isDarkMode ? '#374151' : '#E5E7EB';
};

export const getActivityIndicator = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center',flex: 1}}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}
