import React, {Component} from 'react'
import {Alert} from 'react-native'
import {ButtonGroup} from 'react-native-elements'

class QuestionTypeButtonGroupChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {selectedIndex: 0}
        this.selectQuestionType = this.selectQuestionType.bind(this)
    }

    selectQuestionType(newIndex) {
        this.setState({selectedIndex: newIndex})
    }

    render() {
        const questionTypes = [
            'Multiple Choice',
            'Fill in the blank',
            'Essay',
            'True or\nfalse']
        return(
            <ButtonGroup
                onPress={this.selectQuestionType}
                selectedIndex={this.state.selectedIndex}
                buttons={questionTypes}
                containerStyle={{height: 75}}/>
        )
    }
}
export default QuestionTypeButtonGroupChooser