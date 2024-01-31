import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Text from "../../helpers/Text";
import Container from "../../helpers/Container";
import { fetchMyAPI, fetchMyAPI2, getThemeColor } from "../../utils";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import routes from "../../navigation/routes";

const MessagePage = (props) => {
  const [generalState, setGeneralState] = useState({
    messageData: [],
  });

  useEffect(() => {
    // fetchData()
  },[]);
  async function fetchData() {
    try {
      const result = await fetchMyAPI2("/pusher/chating");
      setGeneralState(prevState => {
        return {
          ...prevState,
          messageData: result.body,
        };
      });
    } catch (err) {
      console.warn("err: ",err)
    }
  }

  const renderHeaderItem = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10}}>
        <Text style={{color: getThemeColor(props?.isDarkMode)}} type={'bold'} size={18}>Mesajlarım</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => props?.navigation?.goBack()}
            style={{width: 50, aspectRatio: 1, marginRight: 10, backgroundColor: '#F7F7F9', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
            <FastImage
              source={require('../../assets/buttons/arrowLeft.png')}
              style={{width: 20, aspectRatio: 1}}
              resizeMode={'contain'}/>
          </TouchableOpacity>
          <View style={{width: 50, aspectRatio: 1, backgroundColor: '#DCF4D9', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
            <FastImage
              source={require('../../assets/icons/search.png')}
              style={{width: 26, aspectRatio: 1}}
              resizeMode={'contain'}/>
          </View>
        </View>
      </View>
    )
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 50, aspectRatio: 1, justifyContent: 'center',alignItems: 'center'}}>
          <FastImage
            source={require('../../assets/icons/profile2.png')}
            style={{width: 30, aspectRatio: 1}}
            resizeMode={'contain'}/>
        </View>
        <TouchableWithoutFeedback onPress={() => props?.navigation?.push(routes.ChatPage, {data: item.channel_name})}>
          <View style={{marginHorizontal: 10, justifyContent: 'space-evenly', height: 50}}>
            <Text size={16} type={'bold'}>{item.userId}</Text>
            <Text>{item.message}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  // if (!generalState?.messageData) {
  //   return (
  //     <View>
  //       <ActivityIndicator/>
  //     </View>
  //   )
  // }

  return (
    <Container>
      <View style={{marginHorizontal: 20}}>
        <FlatList
          style={{marginHorizontal: 20}}
          data={generalState?.messageData}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderItem}
        />
      </View>

    </Container>
  )
}

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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessagePage));
