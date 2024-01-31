import React, {useEffect, useState} from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Container from "../../helpers/Container";
import Text from "../../helpers/Text";
import routes from "../../navigation/routes";

const Weather = (props) => {
  const [generalState, setGeneralState] = useState({
    categoryData: null,
  });


  useEffect(() => {
    console.warn("props: ",props?.route?.params?.items);
    return () => {
      setGeneralState(null);
    }
  }, []); // [props.data]

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Text>weather</Text>
        <TouchableOpacity onPress={() => {
          //setIsVisible(false);
          props?.navigation.goBack(); // <-- this fixed it


        }}>
          <Text style={{fontSize: 20}}>X</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </View>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );

const mapStateToProps = state => {
  return {
    isDarkMode: state.homePage.isDarkMode,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Weather));

