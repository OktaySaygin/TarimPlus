import React from "react";
import Container from "../../helpers/Container";
import { Text, View } from "react-native";

function Agro (props) {
  return (
    <Container>
      <View style={{flex: 1, marginTop: 10}}>
        <Text>Agro</Text>
      </View>
    </Container>
  )
}

export default React.memo(Agro);
