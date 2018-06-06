import React from 'react'
import {ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox, ListItem, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from "../services/QuestionService";
import {MC, TRUEFALSE} from "./ExamWidget";

export default class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = { title: "Multiple-Choice Question Editor"}
    constructor(props) {
        super(props)
        this.state = {
            currentOption: 'content of new option goes here',
            correctOption: '0',
            questionId: '',
            info: '',
            title: '',
            description: '',
            points: '',
            options: []
        }

        this.questionService = QuestionService.instance
        this.deleteOption = this.deleteOption.bind(this)
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setParams(questionId)
        this.questionService.findQuestionByTypeAndId(questionId, MC)
            .then(question => this.setQuestionInfo(question))
    }


    setQuestionInfo(question) {
        this.setState({info: question})
        console.log(question)
        this.setState({questionId: question.id,
            title: question.title,
            description: question.description,
            points: question.points,
            options: this.formatStringToChoices(question.options),
            correctOption: question.correctOption})
    }

    formatStringToChoices(text) {
        text = "" + text
        return text.split("\n")
    }

    convertOptionsToString(options) {
        console.log(options)
        var str = ""
        var count = 0
        options.map(option => {
            if(count != 0) {
                str = str + "\n"
            }
            else {
                count++
            }
            str = str + option
        })
        console.log(str)
        return str
    }

    setParams(id) {
        this.setState({questionId: id})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    setCorrectOption(id) {
        this.setState({correctOption: id})
    }

    addOption() {
        console.log('adding new')
        var newState = [...this.state.options, this.state.currentOption]
        this.updateForm({options: newState})
    }

    deleteOption(delOpt) {
        var newState = this.state.options.filter((option, index) => {
            return (index !== delOpt)
        })
        this.updateForm({options: newState})
    }

    renderOptions() {
        var self = this
        return this.state.options.map(
            function (option, index) {
                return (
                    <ListItem
                        onPress={() => self.setCorrectOption(index)}
                        key={index}
                        title={index+1 + '. ' + option}
                        rightIcon={<Icon
                            name='close'
                            type='font-awesome'
                            color='#517fa4'
                            onPress={() => self.deleteOption(index)}
                        />}
                    />
                )
            }
        )
    }

    render() {
        return(
            <ScrollView>
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

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,
                        backgroundColor: 'yellow'}}
                    defaultValue={this.state.currentOption}
                    editable={true} onChangeText={(text) => this.updateForm({currentOption: text})}/>

                <Icon
                    raised
                    color='#f50'
                    name='plus'
                    type='font-awesome'
                    onPress={() => this.addOption()}
                />

                <Text h2>The correct option: {this.state.correctOption + 1 + ""}</Text>
                {this.renderOptions()}

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.save()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation.goBack()}/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text h2>{this.state.points} points</Text>
                {this.preview()}

            </ScrollView>
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
                    options: this.convertOptionsToString(this.state.options)})
            .then(newState => this.setQuestionInfo(newState))
    }
}

