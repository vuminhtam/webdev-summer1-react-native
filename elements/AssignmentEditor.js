import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";

export default class AssignmentEditor extends React.Component {
    static navigationOptions = { title: "Assignment"}
    constructor(props) {
        super(props)
        this.state = {
            title: 'Assignment Title',
            description: 'This is an example assignment.',
            score: 0
        }

        this.assignmentService = AssignmentService.instance
        this.save = this.save.bind(this)
    }

    save() {
      this.assignmentService.saveAssignment(this.state)
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Assignment Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>

                <FormValidationMessage>
                    Description of assignment is required
                </FormValidationMessage>

                <FormLabel>Score</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({score: text})
                }/>

                <FormValidationMessage>
                    Default score for assignment is 0
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={this.save}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Divider style={{
                    backgroundColor:
                        'grey', padding: 10}}/>
                <Text h2>{this.state.title}</Text>
                <Text h2>Score: {this.state.score}pts </Text>
                <Text>{this.state.description}</Text>
                <Text h2>Student's Answer </Text>
                <TextInput
                    style={{padding:10, height: 100, borderColor: 'gray', borderWidth: 1,
                        backgroundColor: 'white'}}
                    value='Essay answer by student'
                    editable={false}/>
                <TextInput
                    style={{padding:10, height: 40, borderColor: 'gray', borderWidth: 1,
                        backgroundColor: 'white'}}
                    value='Student submit a link'
                    editable={false}/>
                <Button	backgroundColor="white"
                           color="black"
                           title="Upload a file"
                           style={{width: 200}}/>

            </ScrollView>
        )
    }
}
