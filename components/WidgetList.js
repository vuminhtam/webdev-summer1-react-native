import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Divider} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import AssignmentList from "./AssignmentList";
import Tabs from 'react-native-tabs';
import ExamList from "./ExamList";


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
    }


    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("lessonId")
        this.setParams(topicId)
        this.findWidgets(topicId)
    }

    render() {
        return (
            <View style={{padding: 15}}>

                {/*<Tabs selected={'assignments'} style={{backgroundColor:'white'}}*/}
                      {/*selectedStyle={{color:'red'}}>*/}
                    {/*<Text name="assignments">Assignments</Text>*/}
                    {/*<Text name="exams" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Exams</Text>*/}
                    {/*<Text name="others" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Others</Text>*/}
                {/*</Tabs>*/}

                {this.renderAssignments()}
                <Divider style={{
                    backgroundColor:
                        'grey', padding: 10}}/>
                {this.renderExams()}

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

    renderExams() {
        if(this.state.topicId != '') {
            return <ExamList id={this.state.topicId} navigation={this.props.navigation}/>
        }
    }

    renderAssignments() {
        if(this.state.topicId != '') {
            return <AssignmentList id={this.state.topicId} navigation={this.props.navigation}/>
        }
    }

}

export default WidgetList