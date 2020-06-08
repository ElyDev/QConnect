import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  PixelRatio,
} from "react-native";
import colors from "config/colors";
import { screenWidth } from "config/dimensions";
import { Popover, PopoverController } from 'react-native-modal-popover';

//Creates the higher order component
class Word extends React.Component {
  state = {
    selected: this.props.selected,
    isFirstSelectedWord: this.props.isFirstSelectedWord,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.selected === this.props.selected &&
      nextProps.isFirstSelectedWord === this.props.isFirstSelectedWord &&
      nextProps.isWordHighlighted === this.props.isWordHighlighted &&
      nextProps.isAyahHighlighted === this.props.isAyahHighlighted
    ) {
      return false;
    }
    return true;
  }

  //renders the word content.
  //The content is then wrapped in either poppover control or simple touchable 
  // depending on the mus7af version that is being rendered.
  renderWord() {
    const { text, isWordHighlighted, isAyahHighlighted } = this.props;
    return (
      <Text
        style={
          isWordHighlighted || isAyahHighlighted
            ? styles.highlightedWordText
            : styles.wordText
        }
      >
        {text}
      </Text>
    );
  }

  render() {
    const {
      onPress,
      selected,
      isWordHighlighted,
      isFirstSelectedWord,
      highlightedColor,
      isAyahHighlighted,
      showTooltipOnPress
    } = this.props;
    let containerStyle = [styles.container];
    if (selected) {
      containerStyle.push(styles.selectionStyle);
    }
    if (isFirstSelectedWord) {
      containerStyle.push(styles.firstSelectedWordText);
    }
    if (isWordHighlighted === true) {
      containerStyle.push(styles.wordHighlightedStyle);
    }
    if (isAyahHighlighted === true) {
      containerStyle.push(styles.ayahHighlightedStyle);
    }

    let highlightWord =
      highlightedColor !== undefined &&
      (isAyahHighlighted === true || isWordHighlighted === true);

    if (highlightWord) {
      containerStyle.push({
        backgroundColor: highlightedColor,
      });
    }
    return (
      <View style={containerStyle}>
        {showTooltipOnPress === true ? (
          <PopoverController>
            {({
              openPopover,
              closePopover,
              popoverVisible,
              setPopoverAnchor,
              popoverAnchorRect,
            }) => (
              <React.Fragment>
                <TouchableWithoutFeedback
                  ref={setPopoverAnchor}
                  onPress={() => {
                    openPopover();
                    if (!highlightWord) {
                      onPress();
                    }
                  }}
                >
                  {this.renderWord()}
                </TouchableWithoutFeedback>

                <Popover
                  contentStyle={styles.content}
                  arrowStyle={styles.arrow}
                  backgroundStyle={styles.background}
                  visible={popoverVisible}
                  onClose={closePopover}
                  fromRect={popoverAnchorRect}
                  supportedOrientations={['portrait']}
                >
                  <Text>Hello from inside popover!</Text>
                </Popover>
              </React.Fragment>
            )}
          </PopoverController>
        ) : (
          <TouchableWithoutFeedback onPress={() => onPress()}>
            {this.renderWord()}
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}
const mushafFontSize =
  PixelRatio.get() <= 1.5
    ? 14
    : PixelRatio.get() < 2
    ? 15
    : screenWidth >= 400
    ? 16
    : 14;

const styles = StyleSheet.create({
  wordText: {
    textAlign: "right",
    fontFamily: "me_quran",
    fontSize: mushafFontSize,
    color: colors.darkGrey,
  },
  highlightedWordText: {
    textAlign: "right",
    fontFamily: "me_quran",
    fontSize: mushafFontSize,
    color: colors.white,
  },
  container: {
    flexGrow: 1,
    alignSelf: "stretch",
    marginVertical: 1
  },
  selectionStyle: {
    backgroundColor: colors.green
  },
  wordHighlightedStyle: {
    backgroundColor: "rgba(107,107,107,0.8)",
    borderRadius: 3,
    marginHorizontal: 1
  },
  ayahHighlightedStyle: {
    backgroundColor: "rgba(107,107,107,0.8)"
  },
  firstSelectedWordText: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  app: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2ffd2'
  },
  content: {
    padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'pink'
  },
  background: {
    backgroundColor: "rgba(107,107,107,0.2)"
  },
});

export default Word;
