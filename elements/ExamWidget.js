import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {ListItem, ButtonGroup} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import ExamService from "../services/ExamService";
import WidgetService from "../services/WidgetService";
import QuestionService from "../services/QuestionService";

const DEFAULT_TITLE = 'DEFAULT QUESTION TITLE'
const DEFAULT_DESCRIPTION = 'Default description of this question'
const DEFAULT_DESCRIPTION = 'Default description of this question'
const DEFAULT_POINTS = '0'


export default class ExamWidget extends Component {
    static navigationOptions = {title: 'Exam Questions'}

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            questions: [],
            examId: ''
        }
        this.buttons = ['Essay', 'True/False', 'Multiple Choice', 'Fill in Blanks']
        this.mode = ['essay', 'truefalse', 'multichoice', 'blanks']
        this.navElement = [
            'EssayQuestionEditor',
            'TrueFalseQuestionEditor',
            'MultipleChoiceQuestionEditor',
            'FillInBlanksQuestionEditor']
        this.questionService = QuestionService.instance
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount() {
        const {navigation} = this.props;
        const eid = navigation.getParam("examId")
        this.setParams(eid)
        this.findQuestionsByType(eid)
    }

    setParams(eid) {
        this.setState({examId: eid})
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
        this.findQuestionsByType(this.state.examId)
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>

                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={this.buttons}
                    containerStyle={{height: 100}}
                />

                {this.renderAll()}

                <Icon
                    raised
                    color='#f50'
                    name='plus'
                    type='font-awesome'
                    onPress={() => this.addQuestionToExam()}
                />

            </ScrollView>
        )
    }

    findQuestionsByType(eid) {
        this.questionService.findAllByExamByType(eid, this.getMode())
            .then(widgets => this.setState({questions: widgets}))
    }


    renderAll() {
        let list = null
        var self = this
        if (this.state) {
            list = this.state.questions.map(
                function (question, index) {
                    return (
                        <ListItem
                            onPress={() => self.navigateToQuestionByType(question)}
                            key={index}
                            subtitle={question.description}
                            title={question.title}
                            rightIcon={<Icon
                                name='close'
                                type='font-awesome'
                                color='#517fa4'
                                onPress={() => self.deleteWidget(question)}
                            />}
                        />
                    )
                }
            )
        }
        return list
    }

    deleteWidget(widget) {
        this.questionService.deleteById(widget.id)
            .then(() => this.findQuestionsByType(this.state.examId))
        alert('refresh')
    }

    getMode() {
        return this.mode[this.state.selectedIndex]
    }

    navigateToQuestionByType(question) {
        var navEle = this.navElement[this.state.selectedIndex]
        return this.props.navigation.navigate(navEle, {questionId: question.id})
    }

    addQuestionToExam() {
        this.questionService
            .addByExam(this.state.examId, this.createNewWidgetObject(), this.getMode())
            .then(() => this.findWidgets(this.state.examId))
    }

    createNewWidgetObject() {
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments':
                return {title: 'new assignment', description: 'description', score: '0'};
            case 'Exams':
                return {title: 'new quiz', description: 'description for exam'};
            default:
                return {title: 'new widget'}
        }
    }

}
