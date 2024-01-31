import React, {useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { getMenuModalPage } from "./store/action";
import { connect } from "react-redux";
import { apiFetching, fetchMyAPI } from "../../utils";
import {View } from "react-native";
import ActivityIndicator from "../../utils/ActivityIndicator";
import NavigationService from "../../navigation/NavigationService";

const Menu = (props) => {
  return (
    <View>
    </View>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //useDynamicValue,
      getMenuModalPage,
    },
    dispatch,
  );

const mapStateToProps = state => {
  return {
    data: state.menuModalPage.data,
    error: state.menuModalPage.error,
    isFetching: state.menuModalPage.isFetching,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Menu));
