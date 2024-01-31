import React from "react";
import Container from "../../helpers/Container";
import { SafeAreaView } from "react-native";
import Text from "../../helpers/Text";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Settings = () => {
  return (
    <Container>
      <SafeAreaView style={{flex: 1, marginTop: 10, marginHorizontal: 20}}>
        <Text>seettingss</Text>
      </SafeAreaView>
    </Container>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );

const mapStateToProps = state => {
  return {
    isDarkMode: state.homePage.isDarkMode,
    screenHeight: state.homePage.screenHeight,
    screenWidth: state.homePage.screenWidth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Settings));
