import React from 'react';
import {View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from 'elements/FixedHeader'
import TextHeadings from '/elements/TextHeadings'
import Icons from '/elements/Icons'
import ExamEditor from '/elements/Exam'
import QuestionTypeButtonGroupChooser from '/elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from '/elements/QuestionTypePicker'
import TrueFalseQuestionEditor from '/elements/TrueFalseQuestionEditor'
import {Button} from 'react-native-elements'
import ScreenX from '/elements/ScreenX'
import CourseList from '/components/CourseList'

export default
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

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />
                <Button title="Go to Screen X"
                        onPress={() => this.props.navigation
                            .navigate('ScreenX') } />
                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA') } />
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB') } />


                <TrueFalseQuestionEditor/>

                <QuestionTypeButtonGroupChooser/>
                <QuestionTypePicker/>

                <ExamEditor/>

                <Icons/>
                <View style={{padding: 20}}>
                    <TextHeadings/>
                </View>
            </ScrollView>
        )
    }
}