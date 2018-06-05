import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import { Icon } from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";

export default class ExamList extends Component {
    static navigationOptions = {title: 'Exams'}

    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: '',
            topicId: ''
        }
        this.assignmentService = AssignmentService.instance
        this.addAssignmentToTopic = this.addAssignmentToTopic.bind(this)
    }


    componentDidMount() {
        this.findWidgets()
    }

    //
    // _renderSectionTitle(section) {
    //     return (
    //         <View style={styles.content}>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // }
    //
    // _renderHeader(section) {
    //     return (
    //         <View style={styles.header}>
    //             <Text style={styles.headerText}>{section.title}</Text>
    //         </View>
    //     );
    // }
    //
    // _renderContent(section) {
    //     return (
    //         <View style={styles.content}>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.renderAll()}

                <Icon
                    raised
                    color='#f50'
                    name='heartbeat'
                    type='font-awesome'
                    onPress={() => this.addAssignmentToTopic()}
                />

            </View>
        )
    }

    findWidgets() {
        alert('finding')
        const {navigation} = this.props;
        const topicId = navigation.getParam("lessonId")
        const url = "http://localhost:8080/api/topic/" + topicId + "/widget"
        fetch(url)
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets}))
    }

    renderAll() {
        console.log('render')
        var self = this
        this.state.widgets.map(
            function(widget, index) {
                return (
                    <ListItem
                        onPress={() => self.props.navigation
                            .navigate("QuestionList", {examId: widget.id})}
                        key={index}
                        subtitle={widget.description}
                        title={widget.title}/>)
            }
        )
    }

    addAssignmentToTopic() {
        alert('added')
        this.assignmentService.addByTopic(
            this.state.topicId,
            {title: 'title1', description: 'description', score: '0'})
        this.renderAll()
    }
}

