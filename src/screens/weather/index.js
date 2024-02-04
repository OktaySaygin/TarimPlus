import React, {useEffect, useState} from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Container from "../../helpers/Container";
import Text from "../../helpers/Text";
import routes from "../../navigation/routes";
import NavigationService from "../../navigation/NavigationService";

const Weather = (props) => {
  const [generalState, setGeneralState] = useState({
    categoryData: null,
  });


  useEffect(() => {
    //console.warn("props: ",props?.route?.params?.items);
    return () => {
      setGeneralState(null);
    }
  }, []); // [props.data]

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Text>weather</Text>
        <TouchableOpacity onPress={() => {
          NavigationService.back();
        }}>
          <Text style={{fontSize: 20}}>X</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </View>
  );
};
export default React.memo(Weather);

