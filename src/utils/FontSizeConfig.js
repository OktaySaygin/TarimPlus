import React from 'react';
import {
  Dimensions,
  Platform,
} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const getCategoryNameFontSize = () => {
  return 12;
};

export const getTitleFontSize = () => {
  return 16;
};

export const getSpotFontSize = () => {
  return 14;
};

export const getUpdatedTimeFontSize = () => {
  return 12;
};

export const getNewsDetailTitleFontSize = () => {
  return 18;
};

export const getNewsDetailSpotFontSize = () => {
  return 16;
};
