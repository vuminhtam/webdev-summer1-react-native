import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import AssignmentList from "./AssignmentList";

const SECTIONS = [
    {
        title: 'Assignments',
        content: 'Assignment list'
    },
    {
        title: 'Exams',
        content: 'Exam list'
    }
];

const styles = {content: {}, header: {}}

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: '',
            topicId: ''
        }
        this.assignmentService = AssignmentService.instance
    }


    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("lessonId")
        this.setParams(topicId)
        this.findWidgets(topicId)
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
                {/*<Accordion*/}
                {/*sections={SECTIONS}*/}
                {/*renderSectionTitle={this._renderSectionTitle}*/}
                {/*renderHeader={this._renderHeader}*/}
                {/*renderContent={this._renderContent}*/}
                {/*/>*/}

                {/*{this.renderAll()}*/}
                {this.renderAssignments()}

            </View>
        )
    }

    findWidgets(topicId) {
        const url = "http://localhost:8080/api/topic/" + topicId + "/assignment"
        fetch(url)
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets}))
    }

    setParams(topicId) {
        this.setState({topicId: topicId})
    }

    renderAll() {
        let list = null
        var self = this
        if(this.state) {
            list = this.state.widgets.map(
                function (widget, index) {
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
        return list
    }

    renderAssignments() {
        if(this.state.topicId != '') {
            return <AssignmentList id={this.state.topicId}/>
        }
    }

}

export default WidgetList