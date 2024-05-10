import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  Modal,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Container from '../../helpers/Container';
import Text from '../../helpers/Text';
import routes from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import SmallCard from '../../components/SmallCard';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

const Weather = props => {
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);
  const bottomSheetRef = useRef();
  const [generalState, setGeneralState] = useState({
    categoryData: null,
  });

  useEffect(() => {
    //console.warn("props: ",props?.route?.params?.items);
    return () => {
      setGeneralState(null);
    };
  }, []); // [props.data]

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#5B8E55', 'transparent']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          bottom: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
      <View style={styles.toptextsview}>
        <Text style={styles.text1}>San Fransisco</Text>
        <Text style={styles.text2}>11:00</Text>
      </View>
      <FastImage
        source={require('../../assets/backgrounds/sunrain.png')}
        style={styles.anaicon}
      />
      <Text style={styles.anatext1}>Thunderstorm</Text>
      <Text style={styles.anatext2}>24°</Text>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        // enablePanDownToClose={true} //true yapınca alt sekmenin tamamen kapanabilmesini sağlıyor
        backgroundStyle={{borderRadius: 40, backgroundColor: '#5B8E55'}}
        handleIndicatorStyle={{backgroundColor: '#1B5E20'}}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <BottomSheetView style={styles.sheetView}>
            {/* <LinearGradient
              colors={['#000000', '#ffffff']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                bottom: 0,
                //top: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                borderRadius: 40,
              }}
            /> */}
            <BottomSheetScrollView
              showsHorizontalScrollIndicator={false} //kaydırma göstergesini gösterir(kapattım)
              horizontal={true}>
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
            </BottomSheetScrollView>
          </BottomSheetView>
          <BottomSheetView style={styles.bigcardview}>
            <BottomSheetView style={styles.twobigcard}>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
            </BottomSheetView>
            <BottomSheetView style={styles.twobigcard}>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
            </BottomSheetView>
            <BottomSheetView style={styles.twobigcard}>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
            </BottomSheetView>
            <BottomSheetView style={styles.twobigcard}>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
              <BottomSheetView style={styles.bigcard}></BottomSheetView>
            </BottomSheetView>
          </BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#43cd80',
  },
  toptextsview: {
    justifyContent: 'space-between',
    marginVertical: 10,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    paddingLeft: 20,
    fontSize: 15,
    color: 'black',
  },
  text2: {
    paddingRight: 20,
    fontSize: 15,
  },
  buttondiz: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchablebutton: {
    fontSize: 18,
    borderRadius: 4,
    width: '20%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anaicon: {
    width: 100,
    height: 100,
    margin: 10,
  },
  anatext1: {
    fontSize: 25,
    color: 'black',
  },
  anatext2: {
    fontSize: 50,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  contentContainer: {
    //flex: 1,
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  sheetView: {
    //marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
    //backgroundColor: '#43cd80',
    //backgroundColor: 'red',
    flex: 1,
    height: 200,
    width: SCREEN_WIDTH,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1,
    paddingTop: 20,
  },
  bigcardview: {
    width: SCREEN_WIDTH,
    marginLeft: 30,
    marginRight: 30,
  },
  twobigcard: {
    flexDirection: 'row',
  },
  bigcard: {
    width: SCREEN_WIDTH / 2 - 20,
    borderWidth: 2,
    borderColor: 'white',
    height: 130,
    borderRadius: 25,
    margin: 10,
  },
});

export default React.memo(Weather);
