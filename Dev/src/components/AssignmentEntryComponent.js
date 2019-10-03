import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import QcActionButton from 'components/QcActionButton'
import strings from 'config/strings';
import colors from 'config/colors';
import surahNames from 'config/surahNames';
import InputAutoSuggest from 'components/AutoCompleteComponent/InputAutoSuggest'
import fontStyles from 'config/fontStyles';
import { screenWidth, screenHeight } from 'config/dimensions';

export default class AssignmentEntryComponent extends React.Component {

    state = {
        input: ""
    }

    onTextChange(text) {
        this.setState({ input: text });
    }

    componentDidMount() {
        this.onTextChange(this.state.input);
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                presentationStyle="overFullScreen"
                visible={this.props.visible}
                onRequestClose={() => {
                }}>
                <View style={{ marginVertical: screenHeight * 0.073, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: screenHeight * 0.029 }}>
                    <View style={styles.modal}>
                        <Text style={fontStyles.mainTextStyleDarkGrey}>{strings.EnterAssignment}</Text>

                        <InputAutoSuggest
                            staticData={surahNames}
                            onTextChanged={this.onTextChange.bind(this)}
                            assignment={this.props.assignment}
                            inputStyle={fontStyles.mainTextStyleDarkGrey}
                        />

                        <View style={{
                            flexDirection: "row-reverse"
                        }}>
                            <QcActionButton
                                text={strings.Submit}
                                screen={this.props.screen}
                                onPress={() => {
                                    this.props.onSubmit(this.state.input)
                                }} />
                            <QcActionButton
                                text={strings.Cancel}
                                onPress={() => this.props.onCancel()} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: screenHeight * 0.34,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colors.grey,
        borderBottomWidth: 1,
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: screenHeight * 0.0029 },
        shadowOpacity: 0.8,
        shadowRadius: screenHeight * 0.004,
        elevation: screenHeight * 0.003,
        marginHorizontal: screenWidth * 0.11,
        paddingHorizontal: 0.012 * screenWidth
    },
});