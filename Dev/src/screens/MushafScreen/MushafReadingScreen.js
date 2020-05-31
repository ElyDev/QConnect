import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import MushafScreen from "./MushafScreen";
import LoadingSpinner from "components/LoadingSpinner";
import studentImages from "config/studentImages";
import Sound from 'react-native-sound';

const noAyahSelected = {
  surah: 0,
  page: 0,
  ayah: 0
};

const noSelection = {
  start: noAyahSelected,
  end: noAyahSelected,
  started: false,
  completed: false
};

class MushafReadingScreen extends Component {
  state = {
    selection: this.props.navigation.state.params.assignmentLocation
      ? {
          start: this.props.navigation.state.params.assignmentLocation.start,
          end: this.props.navigation.state.params.assignmentLocation.end,
          started: false,
          completed: true
        }
      : noSelection,
    isLoading: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: false });
  }

  closeScreen() {
    const { userID } = this.props.navigation.state.params;

    //todo: if we need to generalize this, then we can add a props: onClose, and the caller specifies the onClose behavior with
    // the call to push navigation to the proper next screen.
    if(this.props.navigation.state.params.origin !== 'FeedObject'){  
      this.props.navigation.push("StudentCurrentClass", {
        userID
      });
      return;
    }
    this.props.navigation.navigate('FeedsScreen');
  }

  onSelectAyah(selectedAyah, selectedWord) {
    console.log(JSON.stringify(selectedWord));
    //todo: implement audio playback
    if (selectedWord) {
      this.setState({ highlightedWord: selectedWord.id });
      let location =
        ('00' + selectedAyah.surah).slice(-3) +
        ('00' + selectedAyah.ayah).slice(-3);

      if (selectedWord.audio) {
        let url = `https://dl.salamquran.com/wbw/${selectedWord.audio}`;
        // 'https://dl.salamquran.com/ayat/afasy-murattal-192/' +
        // location +
        // ".mp3";
        this.playTrack(url);
      }
    }
  }

  playTrack = url => {
    const track = new Sound(url, null, e => {
      if (e) {
        console.log("e: " + JSON.stringify(e));
      } else {
        track.play(success => {
          console.log(JSON.stringify(success));
          this.setState({ highlightedWord: undefined });
        });
      }
    });
  };

  render() {
    const {
      userID,
      assignmentName,
      assignmentLocation,
      assignmentType,
      currentClass,
      studentID,
      classID,
      imageID,
    } = this.props.navigation.state.params;

    const { selection, isLoading } = this.state;

    if (isLoading === true) {
      return (
        <View
          id={this.state.page + "spinner"}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LoadingSpinner isVisible={true} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <MushafScreen
            assignToID={studentID}
            classID={classID}
            profileImage={studentImages.images[imageID]}
            selection={selection}
            highlightedWord={this.state.highlightedWord}
            assignmentName={assignmentName}
            assignmentLocation={assignmentLocation}
            assignmentType={assignmentType}
            topRightIconName="close"
            topRightOnPress={this.closeScreen.bind(this)}
            onClose={this.closeScreen.bind(this)}
            currentClass={currentClass}
            onSelectAyah={this.onSelectAyah.bind(this)}
            disableChangingUser={true}
          />
        </View>
      );
    }
  }
}

export default MushafReadingScreen;
