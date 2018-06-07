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
const DEFAULT_POINTS = '0'

export const ESSAY = 'essay'
export const TRUEFALSE = 'truefalse'
export const MC = 'choice'
export const BLANK = 'blanks'



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
        this.mode = [ESSAY, TRUEFALSE, MC, BLANK]
        this.navElement = [
            'EssayQuestionEditor',
            'TrueFalseQuestionEditor',
            'MultipleChoiceQuestionEditor',
            'FillInBlanksQuestionEditor']
        this.questionEditor = 'BaseQuestionEditor'
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
                            title={question.id + question.title}
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
        // var navEle = this.questionEditor
        return this.props.navigation.navigate(navEle, {examId: this.state.examId, questionId: question.id})
    }

    addQuestionToExam() {
        this.questionService
            .addByExam(this.state.examId, this.createNewWidgetObject(), this.getMode())
            .then(() => this.findQuestionsByType(this.state.examId))
    }

    createNewWidgetObject() {
        switch (this.getMode()) {
            case ESSAY:
                return {type: this.getMode(), title: 'new essay question', description: DEFAULT_DESCRIPTION, score: DEFAULT_POINTS};
            case TRUEFALSE:
                return {type: this.getMode(), title: 'new T/F question', description: DEFAULT_DESCRIPTION, score: DEFAULT_POINTS,
                    isTrue: 'true'};
            case MC:
                return {type: this.getMode(), title: 'new multiple choice question', description: DEFAULT_DESCRIPTION, score: DEFAULT_POINTS,
                    options: 'sampleOption', correctOption: 0};
            case BLANK:
                return {type: this.getMode(), title: 'new fill-in-blank question', description: DEFAULT_DESCRIPTION, score: DEFAULT_POINTS,
                    variables: '2 + 2 = [four=4]\n' +
                    '[two=2] + 2 = 4\n'};
            default:
                return {type: this.getMode(), title: 'new base question'}
        }
    }

}

