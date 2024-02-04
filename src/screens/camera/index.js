import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Modal, SafeAreaView } from "react-native";
import { RNCamera } from 'react-native-camera';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import NavigationService from "../../navigation/NavigationService";
import { connect, useSelector } from "react-redux";
import Container from "../../helpers/Container";
import config from "../../api/config";
import FastImage from "react-native-fast-image";

function Camera(props) {
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const cameraRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const photoPredictPostAPI = async (theFieldId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", profileData?.data[0]?.token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        theFieldImageId: theFieldId
      }),
    };

    try {
      await fetch(config.API_URL + "/the_field_image_with_predict", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          console.warn("ehe: ",json);
        });
    }
    catch (e) {
      console.warn("error: ",e);
    }
  }
  const photoPostAPI = async (imageBaseUrl) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", profileData?.data[0]?.token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        base64Image: imageBaseUrl,
        theFieldId: props?.profileGarden?.data?.id
      }),
    };

    try {
      await fetch(config.API_URL + "/the_field_image", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          photoPredictPostAPI(json?.results?.id);
        });
    }
    catch (e) {
      console.warn("error: ",e);
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await photoPostAPI(data.base64);

      // Çekilen fotoğrafı telefonun hafızasına kaydet
      // CameraRoll.save(data.uri, { type: 'photo', album: 'myGarden' })
      //   .then(() => {
      //     console.warn('Fotoğraf başarıyla kaydedildi.');
      //   })
      //   .catch((error) => {
      //     console.warn('Fotoğraf kaydedilirken bir hata oluştu:', error);
      //   });
    }
    setIsModalVisible(false);
    NavigationService.back();
  };

  return (
    <View style={{flex: 1}}>
      {isModalVisible ? (
          <RNCamera
            ref={cameraRef}
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}>
            <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={{marginLeft: 25}}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    NavigationService.back();
                  }}
                  style={{width: 45, aspectRatio: 1, backgroundColor: 'white', borderRadius: 80, alignItems: 'center', justifyContent: 'center' }}>
                  <FastImage
                    source={require('../../assets/buttons/arrowLeft.png')}
                    style={{width: 20, aspectRatio: 1}}/>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', marginBottom: 60}}>
                <TouchableOpacity
                    onPress={takePicture}
                    style={{width: 80, aspectRatio: 1, borderColor: 'white', borderRadius: 80, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{width: 60, aspectRatio: 1, backgroundColor: 'white', borderRadius: 60 }}/>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </RNCamera>
      ) :
        null
      }
    </View>
  );
};
export default React.memo(Camera);

