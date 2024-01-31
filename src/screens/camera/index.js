import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Modal } from "react-native";
import { RNCamera } from 'react-native-camera';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import NavigationService from "../../navigation/NavigationService";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import Garden from "../garden";
import Container from "../../helpers/Container";
import config from "../../api/config";
import store from "../../store";
import routes from "../../navigation/routes";

const Camera = (props) => {
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
    props?.navigation?.goBack();
  };

  return (
    <Container style={{ flex: 1 }}>
      {isModalVisible ? (
          <RNCamera
            ref={cameraRef}
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 100}}>
              <TouchableOpacity
                  onPress={takePicture}
                  style={{width: 80, aspectRatio: 1, borderColor: '#007533', borderRadius: 80, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{width: 60, aspectRatio: 1, backgroundColor: '#007569', borderRadius: 60 }}/>
              </TouchableOpacity>
            </View>
          </RNCamera>
      ) :
        null
      }
    </Container>
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
    screenHeight: state.homePage.screenHeight,
    screenWidth: state.homePage.screenWidth,
    profileData: state.loginPage.profileData,
    profileGarden: state.gardenPage.profileGarden,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Camera));

