import React from "react";
import Container from "../../helpers/Container";
import { SafeAreaView } from "react-native";
import Text from "../../helpers/Text";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function Settings() {
  return (
    <Container>
      <SafeAreaView style={{flex: 1, marginTop: 10}}>
        <Text>seettingss</Text>
      </SafeAreaView>
    </Container>
  )
}
export default React.memo(Settings);
