import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View, Animated } from "react-native";
import Text from "../../helpers/Text";
import Container from "../../helpers/Container";
import { fetchMyAPI, screenWidth } from "../../utils";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import NavigationService from "../../navigation/NavigationService";

const NewsPage = (props) => {
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const [data, setData] = useState(null);
  const scrollViewRef = useRef(null);
  const [top, setTop] = useState(0);
  const scrollY = new Animated.Value(0);

  const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        useNativeDriver: false,
        listener: event => {

          const offsetY = event.nativeEvent.contentOffset.y;
          scrollViewRef.current.scrollTo({ y: event.nativeEvent.contentOffset.y, animated: true });
          if (offsetY > 0 && offsetY < 460) {
            // console.warn("-- ", offsetX)
            setTop(offsetY);
          }

        }
      }
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchMyAPI("/content/" + props?.route?.params?.newsId, profileData?.data[0]?.token);
        setData(result.body);
      } catch (err) {
        console.warn("err: ",err)
      }
    }
    fetchData();
  }, []);

  const renderHeaderItem = () => {
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{data?.headerTitle}</Text>
        <Text style={{marginTop: 10, fontSize: 16}}>{data?.headerSpot}</Text>
      </View>
    )
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginTop: 20}}>
        <Text size={18} type={'bold'} style={{marginBottom: 5}}>{item?.title}</Text>
        <Text>{item?.description}</Text>
      </View>
    )
  }

  if (!data) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }
  return (
    <Container>
      <Animated.ScrollView onScroll={handleScroll}>
        <FastImage
          source={{uri: data?.headerImage}}
          style={{aspectRatio: 16/9, width: screenWidth}}
          resizeMode={'contain'}>
          <TouchableOpacity onPress={() => NavigationService.back()}
            style={{backgroundColor: 'gray', width: 45, aspectRatio: 1, borderRadius: 45, alignItems: 'center', justifyContent: 'center', margin: 10}}>
            <FastImage style={{aspectRatio: 1, width: 30}}
                       source={require('../../assets/icons/arrowLeft.png')}
                       resizeMode={'contain'}/>
          </TouchableOpacity>
        </FastImage>
      <ScrollView style={{borderRadius: 20, marginTop: -top, backgroundColor: darkModeEnable ? 'black' : 'white'}} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <FlatList
          ref={scrollViewRef}
          scrollEnabled={false}
          style={{padding: 26, marginBottom: 45}}
          data={data?.content}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderItem}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      </Animated.ScrollView>
    </Container>
  )
}
export default React.memo(NewsPage);
