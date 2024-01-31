import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Container from "../../helpers/Container";
import Text from "../../helpers/Text";
import { getIconColor, getPlaceholderColor, getThemeColor } from "../../utils";
import FastImage from "react-native-fast-image";

function VegetableMarket(props) {
  return (
    <Container>
      <View style={{flex: 1, marginTop: 10, marginHorizontal: 20}}>
        <Text>Hal</Text>
      </View>
    </Container>
  );
}
export default React.memo(VegetableMarket);
