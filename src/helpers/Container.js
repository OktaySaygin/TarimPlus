import React from 'react';
import {View, StyleSheet} from 'react-native';

function Container (props) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: 'white'},
          props.style,
        ]}>
        {props.children}
      </View>
    );
}
export default React.memo(Container);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
