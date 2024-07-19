import { TouchableOpacity, View } from "react-native";
import NavigationService from "../navigation/NavigationService";
import routes from "../navigation/routes";
import { fetchMyAPI, screenWidth } from "../utils";
import LottieView from "lottie-react-native";
import Text from "../helpers/Text";
import FastImage from "react-native-fast-image";
import React, { useState } from "react";
import { setProfileGarden } from "../screens/home/store/homeReducer";
import { useDispatch, useSelector } from "react-redux";

function NavigateWidget(props) {
  const profileData = useSelector((state) => state.homeReducer.profileData);
  const dispatch = useDispatch();
  const [generalState, setGeneralState] = useState({
    homeData: null,
    weatherData: null,
    gardenData: null,
    lati: "",
    long: "",
    clicked: false,
    clickedMedicine: false,
    clickedVegetables: false
  });
  const checkGarden = async () => {
    try {
      const result = await fetchMyAPI("/the_field", profileData?.data[0]?.token);
      console.warn("result: ",result)
      setGeneralState(prevState => {
        return {
          ...prevState,
          gardenData: result,
        };
      });
//      NavigationService.navigateToScreenName(routes.Garden, {data: garden})

      let garden = result?.items?.find((value) => value.userId === profileData?.data[0].findUser?.id);
      if (garden !== undefined) {
        console.warn("asdasd: ",garden)
        // store.dispatch(setProfileGarden({data: garden}));
        dispatch(setProfileGarden({data: garden}));
        NavigationService.navigateToScreenName(routes.MyGardenPage, {data: garden})
        //props?.navigation?.push(routes.MyGardenPage, {data: garden});
      }
      // console.warn("data: ",garden)
    } catch (err) {
      console.warn("err: ",err)
    }
    // props?.navigation?.push(routes.Garden)
  }

  return (
    <View style={{marginTop: 20}}>

      <TouchableOpacity
        onPress={() => {
          setGeneralState(prevState => {
            return {
              ...prevState,
              clickedMedicine: true,
            };
          });
          setTimeout(() => {
            NavigationService.navigateToScreenName(routes.Medicine);
          }, 1800);
        }}
        style={{width: screenWidth - 40, height: 80, flexDirection: 'row', marginBottom: 15, backgroundColor: '#a5b27c', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', elevation: 6}}>
        {/*<FastImage*/}
        {/*  source={require('../../assets/icons/ilacImage.png')}*/}
        {/*  style={{width: 70, aspectRatio: 1}}*/}
        {/*  resizeMode={'contain'}/>*/}
        <LottieView
          source={require("../assets/animatedIcons/medicine.json")}
          style={{width: 70, aspectRatio: 1}}
          loop={false}
          autoPlay={generalState?.clickedMedicine}
          resizeMode={'contain'}
          onAnimationFinish={() => {
            setGeneralState(prevState => {
              return {
                ...prevState,
                clickedMedicine: false,
              };
            });
          }}
        />


        <Text style={{color: 'white', width: 180, paddingHorizontal: 20}} size={18} type={'bold'}>TarımPlus'tan İlaçlarım</Text>
        <FastImage
          source={require('../assets/icons/arrowRight.png')}
          style={{width: 30, aspectRatio: 1}}
          resizeMode={'contain'}/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setGeneralState(prevState => {
            return {
              ...prevState,
              clicked: true,
            };
          });
          setTimeout(() => {
            checkGarden();
          }, 1800);
        }}
        style={{width: screenWidth - 40, height: 80, flexDirection: 'row', marginBottom: 15, backgroundColor: '#7a662c', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', elevation: 6}}>
        {/*<FastImage*/}
        {/*  source={require('../../assets/icons/tarlamImage.png')}*/}
        {/*  style={{width: 70, aspectRatio: 1, marginBottom: 10}}*/}
        {/*  resizeMode={'contain'}/>*/}

        <LottieView
          source={require("../assets/animatedIcons/wired-outline-1827-growing-plant.json")}
          style={{width: 70, aspectRatio: 1, marginBottom: 5}}
          loop={false}
          autoPlay={generalState?.clicked}
          resizeMode={'contain'}
          onAnimationFinish={() => {
            setGeneralState(prevState => {
              return {
                ...prevState,
                clicked: false,
              };
            });
          }}
        />
        <Text style={{color: 'white', width: 180, paddingHorizontal: 20}} size={18} type={'bold'}>TarımPlus'tan Tarlam</Text>
        <FastImage
          source={require('../assets/icons/arrowRight.png')}
          style={{width: 30, aspectRatio: 1}}
          resizeMode={'contain'}/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setGeneralState(prevState => {
            return {
              ...prevState,
              clickedVegetables: true,
            };
          });
          setTimeout(() => {
            NavigationService.navigateToScreenName(routes.VegetableMarket);
          }, 1800);
        }}
        style={{width: screenWidth - 40,marginBottom: 10, height: 80, flexDirection: 'row', backgroundColor: '#90CCB7', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', elevation: 4}}>
        {/*<FastImage*/}
        {/*  source={require('../../assets/icons/halImage.png')}*/}
        {/*  style={{width: 70, aspectRatio: 1}}*/}
        {/*  resizeMode={'contain'}/>*/}

        <LottieView
          source={require("../assets/animatedIcons/vegetables.json")}
          style={{width: 70, aspectRatio: 1}}
          loop={false}
          autoPlay={generalState?.clickedVegetables}
          resizeMode={'contain'}
          onAnimationFinish={() => {
            setGeneralState(prevState => {
              return {
                ...prevState,
                clickedVegetables: false,
              };
            });
          }}
        />
        <Text style={{color: 'white', width: 180, paddingHorizontal: 20}} size={18} type={'bold'}>TarımPlus'tan Hal Durumu</Text>
        <FastImage
          source={require('../assets/icons/arrowRight.png')}
          style={{width: 30, aspectRatio: 1}}
          resizeMode={'contain'}/>
      </TouchableOpacity>

    </View>
  )
}

export default React.memo(NavigateWidget);
