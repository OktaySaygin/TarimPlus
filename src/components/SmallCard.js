import {StyleSheet, Image, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {BottomSheetView} from '@gorhom/bottom-sheet';

export default function SmallCard() {
  return (
    <BottomSheetView style={styles.card}>
      <Text style={styles.text1}>12 AM</Text>
      {/* <Image
        style={styles.sunicon}
        source={require('../assets/backgrounds/sun.png')}
      /> */}
      <FastImage
        source={require('../assets/backgrounds/sun.png')}
        style={styles.sunicon}
      />
      <Text style={styles.text2}>19°</Text>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 23,
    shadowOffset: {width: 50, height: 50},
    width: 70,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160,
    borderColor: 'white',
    borderRadius: 35,
    //backgroundColor: '#5B8E55',
  },
  text1: {
    color: 'white',
    fontSize: 15,
    marginTop: 15,
    fontWeight: 'bold',
  },
  sunicon: {
    width: 30,
    height: 30,
  },
  text2: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
