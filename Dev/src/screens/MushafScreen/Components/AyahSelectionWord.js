import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import colors from 'config/colors';

//Creates the higher order component
class Word extends React.Component {

    state = {
        selected: this.props.selected,
        isFirstSelectedWord: this.props.isFirstSelectedWord
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.selected === this.state.selected && 
            nextProps.isFirstSelectedWord === this.props.isFirstSelectedWord){
                return false;
            }
        return true;
    }

    render() {
        const { text, onPress, selected, isFirstSelectedWord } = this.props;
        let containerStyle = [styles.container];
        if(selected) {containerStyle.push(styles.selectionStyle)};
        if(isFirstSelectedWord) {containerStyle.push(styles.firstSelectedWordText)};

        return (
            <View style={containerStyle}>
                <TouchableWithoutFeedback onPress={() => onPress()}>
                    <Text style={styles.wordText} >
                        {text}
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wordText: {
        textAlign: 'right',
        fontFamily: 'me_quran',
        fontSize: 15,
        color: colors.darkGrey
    },
    container: {
        flexGrow: 1, 
        alignSelf: 'stretch',
        marginVertical: 1,
    },
    selectionStyle: {
        backgroundColor: colors.green,
    },
    firstSelectedWordText: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    }
})

export default Word;