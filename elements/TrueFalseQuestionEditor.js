import React from 'react'
import {View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from "../services/QuestionService";
import {TRUEFALSE} from "./ExamWidget";

export default class TrueFalseQuestionEditor extends React.Component {
    static navigationOptions = { title: "True-False Question Editor"}
    constructor(props) {
        super(props)
        this.state = {
            questionId: '',
            info: '',
            title: '',
            description: '',
            points: '',
            isTrue: true
        }

        this.questionService = QuestionService.instance
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setParams(questionId)
        // const questionId = this.state.questionId
        // console.log(questionId)
        this.questionService.findQuestionByTypeAndId(questionId, TRUEFALSE)
            .then(question => this.setQuestionInfo(question))
    }


    setQuestionInfo(question) {
        this.setState({info: question})
        console.log(question)
        this.setState({questionId: question.id,
            title: question.title,
            description: question.description,
            points: question.points,
            isTrue: question.true})
    }

    setParams(id) {
        this.setState({questionId: id})
    }

    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <View>
                <Text h3>{this.state.questionId}</Text>
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

                <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue} title='Checked if the answer is true'/>

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
            </View>
        )
    }

    preview() {
        return <Text h2>The answer is {this.state.isTrue + ""}</Text>
    }

    save() {
        this.questionService
            .updateQuestionById(4462,
                {id: this.state.questionId,
                    title: this.state.title,
                    description: this.state.description,
                    points: this.state.points, type: this.state.info.type,
                    true: this.state.isTrue})
            .then(newState => this.setQuestionInfo(newState))
    }
}

