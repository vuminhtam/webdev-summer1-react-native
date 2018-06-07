import React from 'react'
import {ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from "../services/QuestionService";

export default class EssayQuestionEditor extends React.Component {
    static navigationOptions = { title: "Essay Question Editor"}
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
        // this.setParams(questionId)
        const examId = navigation.getParam("examId")
        this.setParams(questionId, examId)
        this.questionService.findQuestionByTypeAndId(questionId, 'question')
            .then(question => this.setQuestionInfo(question))
    }


    setQuestionInfo(question) {
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
            <ScrollView>
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
                           title="Cancel"
                           onPress={() => this.props.navigation.goBack()}/>


                <Text h3>Preview</Text>
                <Text h2>{this.state.title} - {this.state.points} points</Text>
                <Text>{this.state.description}</Text>
                {this.preview()}

            </ScrollView>
        )
    }

    preview() {
        return <TextInput
            style={{height: 100, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
            editable={false}
            value={"Student's essay response"}
        />
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

