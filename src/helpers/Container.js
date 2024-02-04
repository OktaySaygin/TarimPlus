import React from 'react';
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

function Container (props) {
  const darkModeEnable = useSelector((state) => state.homeReducer.isDarkMode);

  return (
    <SafeAreaView style={{backgroundColor:  darkModeEnable ? '#131313' : '#f3f3f3'}}>
      <View
        style={[
          styles.container,
          {backgroundColor: darkModeEnable ? 'black' : 'white'},
          props.style,
        ]}>
        {props.children}
      </View>
    </SafeAreaView>
    );
}
export default React.memo(Container);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
