import React from 'react';
import {ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getIconColor, getThemeColor} from "./index";

//import {useDynamicValue} from '../theme/store/action';  // TODO: SEDAT

class CustomActivityIndicator extends React.PureComponent {
  render() {
    // return <ActivityIndicator {...this.props} color={this.props.useDynamicValue('white', 'black')} />; // TODO: SEDAT
    return <ActivityIndicator {...this.props} color={getIconColor(this.props?.isDarkMode)} style={{backgroundColor: getThemeColor(this.props?.isDarkMode), flex: 1, width: '100%'}} />;
  }
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomActivityIndicator);
