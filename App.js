import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import AssignmentEditor from './elements/AssignmentEditor'

import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import TopicList from './components/TopicList'
import ExamWidget from './elements/ExamWidget'
import FillInBlanksQuestionEditor from './elements/FillInBlanksQuestionEditor'
import BaseQuestionEditor from './elements/BaseQuestionEditor'



class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>

                <StatusBar barStyle="light-content"/>
                <FixedHeader/>
                <Button title="Topics"
                        onPress={() => this.props.navigation
                            .navigate('TopicList')} />
                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')} />
            </ScrollView>
        )
    }
}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

const ScreenB = () => (
    <View>
        <Text h1>Screen B</Text>
    </View>
)

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentEditor,
    ExamWidget,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    FillInBlanksQuestionEditor,
    BaseQuestionEditor
});

export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
