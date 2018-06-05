import React, {Component} from 'react'
import { ScrollView} from 'react-native'
import { ListItem, ButtonGroup} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import ExamService from "../services/ExamService";



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
        this.buttons = ['Assignments', 'Exams']
        this.mode = ['assignment', 'exam', 'widget']
        this.navElement = ['AssignmentEditor', 'QuestionList']
        this.updateIndex = this.updateIndex.bind(this)
    }

        componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("lessonId")
        this.setParams(topicId)
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

                <Icon
                    raised
                    color='#f50'
                    name='plus'
                    type='font-awesome'
                    onPress={() => this.addWidgetToTopic()}
                />

            </ScrollView>
        )
    }

    findWidgetsByMode(topicId) {
        const mode = this.getMode()
        const url = "http://localhost:8080/api/topic/" + topicId + "/" + mode
        fetch(url)
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets: widgets}))
    }

    setParams(topicId) {
        this.setState({topicId: topicId})
    }

    renderWidgets() {

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
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments': return this.props.navigation.navigate("AssignmentEditor", {id: widget.id})
            case 'Exams': return this.props.navigation.navigate("QuestionList", {examId: widget.id})
            default: return
        }
    }

    addWidgetToTopic() {
        this.getServiceByMode()
            .addByTopic(this.state.topicId,
                this.createNewWidgetObject())
            .then(() => this.findWidgets(this.state.topicId))
    }

    getServiceByMode() {
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments': return AssignmentService.instance;
            case 'Exams': return ExamService.instance;
            default: return AssignmentService.instance
        }
    }

    createNewWidgetObject() {
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments': return {title: 'new assignment', description: 'description', score: '0'};
            case 'Exams': return {title: 'new quiz', description: 'description for exam'};
            default: return {title: 'new widget'}
        }
    }

}

export default WidgetList