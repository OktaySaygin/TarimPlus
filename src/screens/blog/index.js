import React from "react";
import Container from "../../helpers/Container";
import { Text, View } from "react-native";
function Blog(props) {
  return (
    <Container>
      <View style={{flex: 1, marginTop: 10}}>
        <Text>Blog</Text>
      </View>
    </Container>
  )
}

export default React.memo(Blog);
