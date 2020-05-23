import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import FirebaseFunctions from '../../../config/FirebaseFunctions';
import colors from '../../../config/colors';
import SideMenu from 'react-native-side-menu';
import StudentLeftNavPane from '../StudentScreens/LeftNavPane';
import TeacherLeftNavPane from '../TeacherScreens/LeftNavPane';
import LoadingSpinner from '../../components/LoadingSpinner';
import TopBanner from 'components/TopBanner';
import FeedsObject from '../../components/FeedObject';
import { screenHeight, screenWidth } from '../../../config/dimensions';
import EmojiSelector from '../../components/CustomizedEmojiSelector';
import { FlatList } from 'react-native-gesture-handler';
import teacherImages from '../../../config/teacherImages';
import studentImages from '../../../config/studentImages';

export default class FeedsScreen extends React.Component {
  state = {
    currentClass: {},
    isOpen: false,
    classes: [],
    isLoading: true,
    userID: '',
    LeftNavPane: {},
    role: '',
    currentClassID: '',
    teacher: null,
    keyboardAvoidingMargin: 0,
    student: null,
    currentlySelectingIndex: -1,
    feedsData: [
      {
        madeByUser: {ID: '123456e83jicw', imageID: 21},
        content: 'Emad gained 50 points!',
        type: 'notification',
        reactions: [
          {
            emoji: "😋",
            reactedBy: ['Gx6OAwlilxV9OBB7v63wesjpal22']
          }
        ],
        comments: [
          {
            user: {
              imageID: 2,
              name: 'Ahmed Mohammad',
              role: 'student'
            },
            content: 'Hey Everyone'
          }
        ]
      },
      {
        madeByUser: {ID: 'Gx6OAwlilxV9OBB7v63wesjpal22', imageID: 21},
        content: {
          assignmentType: 'Memorization',
          start: { ayah: 1, surah: 2, page: 2 },
          end: { ayah: 11, page: 2, surah: 2 }
        },
        type: 'assignment',
        reactions: [],
        comments: [
          {
            user: {
              imageID: 2,
              name: 'Ahmed Mohammad',
              role: 'student'
            },
            content: 'Hey Everyone'
          }
        ]
      },
      {
        madeByUser: {ID: 'feijwowe', imageID: 21},
        content: {
          assignmentType: 'Memorization',
          start: { ayah: 1, surah: 2, page: 2 },
          end: { ayah: 11, page: 2, surah: 2 }
        },
        type: 'assignment',
        reactions: [],
        comments: [
          {
            user: {
              imageID: 2,
              name: 'Ahmed Mohammad',
              role: 'student'
            },
            content: 'Hey Everyone'
          }
        ]
      },
      {
        madeByUser: {ID: 'jiewfjeo', imageID: 21},
        content: 'Emad gained 50 points!',
        type: 'notification',
        reactions: [
          {
            emoji: "😋",
            reactedBy: ['Gx6OAwlilxV9OBB7v63wesjpal22']
          }
        ],
        comments: [
          {
            user: {
              imageID: 2,
              name: 'Ahmed Mohammad',
              role: 'student'
            },
            content: 'Hey Everyone'
          },
          {
            user: {
              imageID: 2,
              name: 'Ahmed Mohammad',
              role: 'student'
            },
            content: 'Hey Everyone'
          },
          {
            user: {
              imageID: 2,
              name: 'Ahmed Mohammad',
              role: 'student'
            },
            content: 'Hey Everyone'
          },
        ]
      }
    ],
    isSelectingEmoji: false,
    isCommenting: false,
    keyboardAvoidingMargin: 0,
    inputHeight: screenHeight/12
  };
  componentWillUnmount(){
   this.keyboardDidShowListener = null;
  }
  async componentDidMount() {
    console.warn(screenHeight/12)
    FirebaseFunctions.setCurrentScreen('Class Feed Screen', 'ClassFeedScreen');
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => this.setState({keyboardAvoidingMargin: e.endCoordinates.height-65}))
    const { userID } = this.props.navigation.state.params;
    const teacher = await FirebaseFunctions.getTeacherByID(userID);
    let currentClassID;
    let LeftNavPane;
    let classes;
    let userType;
    userType = teacher;
    if (teacher == -1) {
      const student = await FirebaseFunctions.getStudentByID(userID);
      userType = student;
      LeftNavPane = StudentLeftNavPane;
      this.setState({ student, role: 'student' });
    } else {
      LeftNavPane = TeacherLeftNavPane;
      this.setState({ teacher, role: 'teacher' });
    }
    currentClassID = userType.currentClassID;
    classes = await FirebaseFunctions.getClassesByIDs(userType.classes);
    const currentClass = await FirebaseFunctions.getClassByID(currentClassID);
    const { classInviteCode } = currentClass;
    const feedsData = await FirebaseFunctions.getLatestFeed(currentClassID);
    this.setState({
      isLoading: false,
      currentClass,
      currentClassID,
      classInviteCode,
      LeftNavPane,
      feedsData,
      userID,
      classes,
    });
  }
  toggleSelectingEmoji(index) {
    if (!this.state.isSelectingEmoji) {
      this.setState({ currentlySelectingIndex: index });
    }
    this.setState({ isSelectingEmoji: !this.state.isSelectingEmoji });
  }
  render() {
    const { LeftNavPane } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={localStyles.spinnerContainerStyle}>
          <LoadingSpinner isVisible={true} />
        </View>
      );
    }
    return (
      <SideMenu
      isOpen={this.state.isOpen}
      menu={
        <LeftNavPane
          teacher={this.state.teacher}
          student={this.state.student}
          userID={this.state.userID}
          classes={this.state.classes}
          edgeHitWidth={0}
          navigation={this.props.navigation}
        />
      }
    >
      <View style={[localStyles.containerView, {paddingTop: 0}]}>
        <TopBanner
          LeftIconName="navicon"
          LeftOnPress={() => this.setState({ isOpen: true })}
          Title={this.state.currentClass.name + ' Feed'}
        />
        <ScrollView style={localStyles.scrollViewStyle}>
          <FlatList
            listKey={0}
            data={this.state.feedsData}
            renderItem={({ index, item, separators }) => (
              <FeedsObject
                comments={[]}
                onPressSelectEmoji={() => this.toggleSelectingEmoji(index)}
                madeByUser={item.madeByUser.ID}
                currentUser={
                  this.state.role === 'teacher'
                    ? this.state.teacher
                    : this.state.student
                }
                role={this.state.role}
                content={item.content}
                number={index}
                beginCommenting={() => {this.setState({isCommenting: true})}}
                key={index}
                type={item.type}
                comments={item.comments}
                reactions={item.reactions}
                imageRequire={this.state.role === 'teacher' ? teacherImages.images[item.madeByUser.imageID] : studentImages.images[item.madeByUser.imageID]}
              />
            )}
          />
        </ScrollView>
      </View>
      {this.state.isSelectingEmoji ?
          <EmojiSelector
            theme={colors.primaryLight}
            onEmojiSelected={emoji => {
              let temp = this.state.feedsData;
              let currentIndex = this.state.currentlySelectingIndex;
              temp[currentIndex].reactions[
              temp[currentIndex].reactions.length
              ] = {
                emoji,
                reactedBy: [this.state.userID]
              };
              this.setState({ currentlySelectingIndex: -1, feedsData: temp });
              this.toggleSelectingEmoji();
            }}
            onBackdropPress={() => this.toggleSelectingEmoji()}
           />
        :
        null
      }
      {this.state.isCommenting ?
        <View style={[localStyles.commentingContainer, {paddingBottom: this.state.keyboardAvoidingMargin}]}>
            <TextInput multiline onContentSizeChange={(event) => this.setState({inputHeight: event.nativeEvent.contentSize.height+5})} onBlur={() => this.setState({isCommenting: false})} autoFocus style={localStyles.commentingTextInput}/>
            <TouchableOpacity style={[localStyles.sendBtn]}>
              <Text style={{color: colors.primaryDark}}>
                Send
              </Text>
            </TouchableOpacity>
        </View>
      :
      null}
    </SideMenu>
    );
  }
}
const localStyles = StyleSheet.create({
  containerView: {
    flex: 1
  },
  sendBtn: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
    marginBottom: screenHeight/700,
    borderRadius: 10,
  },
  commentingContainer: {
    width: screenWidth,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.veryLightGrey
  },
  commentingTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    height: '70%',
    flexWrap: 'wrap',
    marginLeft: screenWidth/15,
    marginBottom: screenHeight/700,
    borderColor: colors.primaryDark,
    width: screenWidth/2
  },
  scrollViewStyle: {
    backgroundColor: colors.lightGrey,
  },
  spinnerContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
