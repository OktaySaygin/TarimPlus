import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Text from "../helpers/Text";
import { Carousel, Pagination } from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../navigation/NavigationService";
import routes from "../navigation/routes";
import { screenWidth } from "../utils";
import { useSelector } from "react-redux";

const MainSlider = (props) => {
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const keyExtractor = useCallback((item, index) => index, []);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
        NavigationService.navigateToScreenName(routes.NewsPage, {newsId: item?.id})
        // props?.navigation?.push(routes.NewsPage, {newsId: item?.id})
      }} style={{marginRight: 14}}>
        <View>
          <FastImage
            source={{uri: item?.image}}
            style={{aspectRatio: 16/9, borderRadius: 20, justifyContent: 'flex-end'}}>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
              // start={{x: 0, y: 0}}
              // end={{x: 0, y: 1}}
              style={{
                bottom: 0,
                width: '100%',
                height: '80%',
                position: 'absolute',
              }}
            />
            <Text style={{marginBottom: 10, color: 'white', height: 60, marginHorizontal: 16}} numberOflibes={2} size={20} type={'bold'}>{item?.spot}</Text>
          </FastImage>
          <Text style={{marginTop: 5, marginHorizontal: 10}} size={16} numberOfLines={3}>{item?.title}</Text>

        </View>
      </TouchableOpacity>

    )
  }
  return (
    <View style={{marginTop: 10}}>
      <Carousel
        data={props?.item.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        decelerationRate={0.5}
        sliderWidth={screenWidth - 40}
        itemWidth={(screenWidth - 40) / 1.2}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideAlignment={'start'}
        useExperimentalSnap={true}
        layout={'default'}
        enableSnap={true}
        shouldOptimizeUpdates
        disableIntervalMomentum={true}
        onScrollIndexChanged={(index) => {
          setCurrentIndex(index);
        }}
      />
      <Pagination
        inactiveDotColor={darkModeEnable ? 'white' : 'black'}
        dotColor={darkModeEnable ? 'white' : 'black'}
        dotsLength={props?.item?.items?.length}
        activeDotIndex={currentIndex}
        containerStyle={{marginVertical: -15}}/>
    </View>
  )
}
export default React.memo(MainSlider);
