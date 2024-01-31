import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View } from "react-native";
import Container from "../../helpers/Container";
import Text from "../../helpers/Text";
import { getIconColor, getPlaceholderColor, getThemeColor } from "../../utils";
import FastImage from "react-native-fast-image";
import Switch from 'react-native-switch-pro'
import config from "../../api/config";
import store from "../../store";
import routes from "../../navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { setProfileGarden } from "../home/store/homeReducer";
import NavigationService from "../../navigation/NavigationService";

function Garden(props) {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const [fieldName, setFieldName] = useState("");
  const [fieldDesp, setFieldDesp] = useState("");
  const handleGarden = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", profileData?.data[0]?.token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        name: fieldName,
        description: fieldDesp,
      }),

    };

    try {
      await fetch(config.API_URL + "/the_field", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          console.warn(json);
          if (json?.status) {
            dispatch(setProfileGarden({data: json.results}));
            //store.dispatch(setProfileGarden({data: json.results}));
            NavigationService.navigateToScreenName(routes.MyGardenPage);
          }
        });
    }
    catch (e) {
      console.warn("error: ",e);
    }

  }
  const getBoxes = () => {
    return (
      <View style={{
        width: '100%',
        marginBottom: 20,
        // borderWidth: 1,
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
          height: 5,
          width: 2
        },
        elevation: 1,
        backgroundColor: 'white',
        // shadowColor: 'white',
        // borderWidth: 0.3,
        // borderColor: 'black',
        flexDirection: 'row', borderRadius: 10, padding: 20}}>
        <View style={{backgroundColor: '#5B8E55', aspectRatio: 1, height: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
          <FastImage
            source={require('./../../assets/icons/waterFlip.png')}
            style={{width: 30, height: 30}}
            resizeMode={'contain'}/>
        </View>
        <View style={{ marginLeft: 10, justifyContent: 'center'}}>
          <Text size={16}>Watering</Text>
          <Text color={'gray'}>Thrice In A Week</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Switch backgroundActive={'#D0E7D2'} circleColorActive={'#61B458'} style={{width: 40, height: 20}} onSyncPress={(callback) => {
            console.warn("-- ", callback)
          }}/>
        </View>
      </View>
    );
  }
  return (
    <Container>
      <View style={{flex: 1, marginTop: 10, marginHorizontal: 20, alignItems: 'center'}}>
        {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{fontSize: 22, fontWeight: 700, fontFamily: 'serif'}}>Tarım</Text>
            <Text style={{color: getThemeColor(props?.isDarkMode), fontSize: 22, fontWeight: 'bold', fontFamily: 'serif'}}>PLUS</Text>
          </View>





        <View style={{width: 140, height: 180, borderColor: '#61B458', alignItems: 'flex-end', justifyContent: 'flex-end', borderWidth: 1, marginBottom: 20, alingSelf: 'center', borderRadius: 18}}>
          <View style={{width: 40, aspectRatio: 1, borderRadius: 40, backgroundColor: '#61B458', marginRight: -14, marginBottom: -14, alignItems: 'center', justifyContent: 'center'}}>
            <Text color={'white'} style={{fontWeight: 'bold'}} size={30}>+</Text>
          </View>
        </View>

        <TextInput
          style={{paddingLeft: 10, borderRadius: 10, marginBottom: 10, color: getIconColor(props?.isDarkMode), borderWidth: 1, borderColor: '#61B458', height: 40, width: '100%'}}
          placeholder={'Name Of The Plant'}
          placeholderTextColor={'gray'}
          onChangeText={(query) => {
            setFieldName(query);
          }}
        />
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <TextInput
            style={{flex: 1, paddingLeft: 10, marginRight: 20, borderRadius: 10, color: getIconColor(props?.isDarkMode), borderWidth: 1, borderColor: '#61B458', height: 40}}
            placeholder={'Add Type'}
            placeholderTextColor={'gray'}
            onChangeText={(query) => {
              setFieldName(query);
            }}
          />
          <TextInput
            style={{flex: 1, paddingLeft: 10, borderRadius: 10, color: getIconColor(props?.isDarkMode), borderWidth: 1, borderColor: '#61B458', height: 40}}
            placeholder={'Add Location'}
            placeholderTextColor={'gray'}
            onChangeText={(query) => {
              setFieldDesp(query);
            }}
          />
        </View>

        <View>
          {getBoxes()}
          {getBoxes()}
          {/*{getBoxes()}*/}
        </View>

        <TouchableOpacity
          onPress={() => handleGarden()}
          style={{backgroundColor: '#5B8E55', borderRadius: 14, width: 120, height: 50, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', marginTop: -10}}>
          <Text color={'white'} style={{fontWeight: 'bold'}} size={16}>Ekle</Text>
        </TouchableOpacity>
        { /*  <MyPhotos/>*/}
      </View>
    </Container>
  )
};
export default React.memo(Garden);

