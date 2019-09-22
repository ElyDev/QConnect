import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from 'config/colors'
import FontLoadingComponent from 'components/FontLoadingComponent'
import fontStyles from '../../config/fontStyles';

class QcActionButton extends FontLoadingComponent {

  onButtonPress() {

    this.props.onPress();

  }

  render() {
    const { text, disabled } = this.props;
    return (
      <TouchableOpacity disabled={disabled ? disabled : false} style={styles.buttonStyle}
        onPress={() => this.onButtonPress()}>
        <Text style={fontStyles.mainTextStylePrimaryDark}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

QcActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  screen: PropTypes.string,
};


const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

  },
});

export default QcActionButton;