import React from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Button, CheckBox, ListItem, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from "../services/QuestionService";
import {BLANK, MC, TRUEFALSE} from "./ExamWidget"
import CustomMultiPicker from "react-native-multiple-select-list";

const reactStringReplace = require('react-string-replace')

export default class FillInBlanksQuestionEditor extends React.Component {
    static navigationOptions = { title: "Fill-in-Blanks Question Editor"}
    constructor(props) {
        super(props)
        this.state = {
            questionId: '',
            info: '',
            title: '',
            description: '',
            points: '',
            variables: ''
        }

        this.questionService = QuestionService.instance
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setParams(questionId)
        this.questionService.findQuestionByTypeAndId(questionId, BLANK)
            .then(question => this.setQuestionInfo(question))
    }


    setQuestionInfo(question) {
        this.setState({info: question})
        this.setState({questionId: question.id,
            title: question.title,
            description: question.description,
            points: question.points,
            variables: question.variables})
    }

    setParams(id) {
        this.setState({questionId: id})
    }

    updateForm(newState) {
        this.setState(newState)
    }


    // renderOptions() {
    //     var self = this
    //     return this.state.options.map(
    //         function (option, index) {
    //             return (
    //                 <ListItem
    //                     onPress={() => self.setCorrectOption(index)}
    //                     key={index}
    //                     title={index+1 + '. ' + option}
    //                     rightIcon={<Icon
    //                         name='close'
    //                         type='font-awesome'
    //                         color='#517fa4'
    //                         onPress={() => self.deleteOption(index)}
    //                     />}
    //                 />
    //             )
    //         }
    //     )
    // }

    render() {
        return(
            <ScrollView>
                {this.preview()}

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
                    multiline={true}
                    style={{height: 100, borderColor: 'gray', borderWidth: 1,
                        backgroundColor: 'white'}}
                    defaultValue={this.state.variables}
                    editable={true}
                    onChangeText={(text) => this.updateForm({variables: text})}/>


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

            </ScrollView>
        )
    }



    preview() {
        return this.formatVariables()
    }

    formatVariables() {
        const reactStringReplace = require('react-string-replace')
        var key = 0
        let blank =  <TextInput
            style={{height: 30, width: 60, borderColor: 'gray', borderWidth: 0, backgroundColor: 'white'}}
            editable={true}
            value={""}/>
        var myStr = this.state.variables
        var reg = /\[(.*?)\]/igm
        var blankStr = reactStringReplace(myStr, reg, (match) => (this.getBlank(match)))
        return <Text>{blankStr.map((ele) => this.format(ele, key++))}</Text>
    }

    format(ele, key) {
        return ele
    }

    getBlank(match) {
        return <View>
            <TextInput
            style={{height: 30, width: 100, borderColor: 'gray', borderWidth: 0, backgroundColor: 'white'}}
            editable={true}/></View>
    }

    save() {
        this.questionService
            .updateQuestionById(4462,
                {id: this.state.questionId,
                    title: this.state.title,
                    description: this.state.description,
                    points: this.state.points, type: this.state.info.type,
                    variables: this.state.variables})
            .then(newState => this.setQuestionInfo(newState))
    }
}

