import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from "../services/QuestionService";

export default class BaseQuestionEditor extends React.Component {
    static navigationOptions = { title: "Question Editor"}
    constructor(props) {
        super(props)
        this.state = {
            examId: '',
            questionId: '',
            info: '',
            title: '',
            description: '',
            points: ''
        }

        this.questionService = QuestionService.instance
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const examId = navigation.getParam("examId")
        this.setParams(questionId, examId)
        // const questionId = this.state.questionId
        // console.log(questionId)
        this.questionService.findQuestionById(questionId)
            .then(question => this.setQuestionInfo(question))
    }


    setQuestionInfo(question) {
        console.log(question)
        this.setState({info: question})
        this.setState({questionId: question.id, title: question.title, description: question.description, points: question.points})
    }

    setParams(id, examId) {
        this.setState({questionId: id})
        this.setState({examId: examId})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput
                    defaultValue={this.state.title}
                    onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    defaultValue={this.state.description}
                    onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    defaultValue={this.state.points+""}
                    onChangeText={
                        text => this.updateForm({points: text})
                    }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                onPress={() => this.save()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title} - {this.state.points} points</Text>
                <Text>{this.state.description}</Text>

            </View>
        )
    }

    save() {
        this.questionService
            .updateQuestionById(this.state.examId,
                {id: this.state.questionId,
                    title: this.state.title,
                    description: this.state.description,
                    points: this.state.points, type: this.state.info.type})
            .then(newState => this.setQuestionInfo(newState))
    }
}

