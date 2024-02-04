import React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';
import { useSelector } from "react-redux";

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

function CustomText(props) {
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);

  const types = {
    bold: styles.bold,
    italic: styles.italic,
    regular: styles.regular,
    italicBold: styles.italicBold,
  };

  const {style = {}, children, type} = props;
  const passedStyles = {...style};
  const textStyle = types[type] || styles.regular;
  passedStyles.fontSize = props?.size || style?.fontSize;
  passedStyles.color = props?.color == null && style.color == null ? (darkModeEnable ? 'white' : 'black') : props?.color == null ? style.color : props?.color;

  return (
    <Text {...props} style={[textStyle, passedStyles]}>
      {children}
    </Text>
  );
};
export default React.memo(CustomText);

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Roboto-Regular',
  },
  bold: {
    fontFamily: 'Roboto-Bold',
  },
  italic: {
    fontFamily: 'Roboto-Italic',
  },
  italicBold: {
    fontFamily: 'Roboto-BoldItalic',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
  },
  mediumItalic: {
    fontFamily: 'Roboto-MediumItalic',
  },
  thin: {
    fontFamily: 'Roboto-Thin',
  },
  thinItalic: {
    fontFamily: 'Roboto-ThinItalic',
  },
  light: {
    fontFamily: 'Roboto-Light',
  },
  lightItalic: {
    fontFamily: 'Roboto-Light',
  },
  black: {
    fontFamily: 'Roboto-Black',
  },
  blackItalic: {
    fontFamily: 'Roboto-BlackItalic',
  },


  PTRegular: {
    fontFamily: 'PT-Regular',
  },
  PTBold: {
    fontFamily: 'PT-Bold',
  },
  PTItalic: {
    fontFamily: 'PT-Italic',
  },
  PTItalicBold: {
    fontFamily: 'PT-BoldItalic',
  },
});
