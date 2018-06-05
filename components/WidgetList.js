import React, {Component} from 'react'
import {View, ScrollView, Alert, Switch} from 'react-native'
import {Text, ListItem, Divider, ButtonGroup} from 'react-native-elements'
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
            selectedIndex: 0,
            widgets: [],
            courseId: '',
            moduleId: '',
            topicId: ''
        }
        this.buttons = ['Assignments', 'Exams', 'View All']
        this.mode = ['assignment', 'exam', 'widget']
        this.navElement = ['AssignmentEditor', 'QuestionList']
        this.updateIndex = this.updateIndex.bind(this)
    }

        componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("lessonId")
        this.setParams(topicId)
        //this.findWidgets(topicId)
        this.findWidgetsByMode(topicId)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
        this.findWidgetsByMode(this.state.topicId)
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>

                {/*<Tabs selected={'assignments'} style={{backgroundColor:'white'}}*/}
                      {/*selectedStyle={{color:'red'}}>*/}
                    {/*<Text name="assignments">Assignments</Text>*/}
                    {/*<Text name="exams" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Exams</Text>*/}
                    {/*<Text name="others" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Others</Text>*/}
                {/*</Tabs>*/}

                {/*{this.renderAssignments()}*/}
                {/*<Divider style={{*/}
                    {/*backgroundColor:*/}
                        {/*'grey', padding: 10}}/>*/}
                {/*{this.renderExams()}*/}

                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={this.buttons}
                    containerStyle={{height: 100}}
                />

                {this.renderWidgets()}

            </ScrollView>
        )
    }

    findWidgets(topicId) {
        const url = "http://localhost:8080/api/topic/" + topicId + "/assignment"
        fetch(url)
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets}))
    }

    findWidgetsByMode(topicId) {
        const mode = this.getMode()
        const url = "http://localhost:8080/api/topic/" + topicId + "/" + mode
        console.log(mode)
        fetch(url)
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets}))
    }

    setParams(topicId) {
        this.setState({topicId: topicId})
    }

    renderWidgets() {
        // {this.state.widgets.map(
        //     (widget, index) => (
        //         <ListItem
        //             // onPress={() => this.props.navigation
        //             //     .navigate("QuestionList", {examId: widget.id})}
        //             onPress={() => this.getNavigateOnMode(widget)}
        //             key={index}
        //             subtitle={widget.description}
        //             title={widget.title}/>))}

        let list = null
        var self = this
        if(this.state) {
            list = this.state.widgets.map(
                function (widget, index) {
                    return (
                        <ListItem
                            onPress={() => self.getNavigateOnMode(widget)}
                            key={index}
                            subtitle={widget.description}
                            title={widget.title}
                            rightIcon={<Icon
                                name='cross' />}/>
                    )
                }
            )
        }
        return list
    }

    getMode() {
        console.log('seleting ' + this.state.selectedIndex)
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments': return 'assignment'
            case 'Exams': return 'exam'
            default: return 'widget'
        }
    }

    getNavigateOnMode(widget) {
        // if(this.state.selectedIndex === 2) {
        //     console.log('hello')
        // }
        // else {
        //     this.props.navigation.navigate(this.navElement[this.state.selectedIndex], {id: widget.id})
        // }
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments': return this.props.navigation.navigate("AssignmentEditor", {id: widget.id})
            case 'Exams': return this.props.navigation.navigate("QuestionList", {examId: widget.id})
            default: return
        }
    }

    // renderExams() {
    //     if(this.state.topicId != '') {
    //         return <ExamList id={this.state.topicId} navigation={this.props.navigation}/>
    //     }
    // }
    //
    // renderAssignments() {
    //     if(this.state.topicId != '') {
    //         return <AssignmentList id={this.state.topicId} navigation={this.props.navigation}/>
    //     }
    // }

}

export default WidgetList