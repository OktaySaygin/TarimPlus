import React from "react";
import { Text, View } from "react-native";
import Container from "../../helpers/Container";

function Medicine(props) {
  return (
    <Container>
      <View style={{flex: 1, marginTop: 10, marginHorizontal: 20}}>
        <Text>İlaçlarım</Text>
      </View>
    </Container>
  )
}
export default React.memo(Medicine);
