import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {ListItem, ButtonGroup} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import ExamService from "../services/ExamService";
import WidgetService from "../services/WidgetService";


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
        this.navElement = ['AssignmentEditor', 'ExamWidget']
        this.widgetService = WidgetService.instance
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("lessonId")
        this.setParams(topicId)
        this.findWidgetsByMode(topicId)
    }

    setParams(topicId) {
        this.setState({topicId: topicId})
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
        this.findWidgetsByMode(this.state.topicId, selectedIndex)
    }

    // updateIndex(selectedIndex) {
    //     this.setState({selectedIndex: selectedIndex})
    //     //this.findWidgetsByMode(this.state.topicId)
    // }

    render() {
        return (
            <ScrollView style={{padding: 15}}>

                <ButtonGroup
                    onPress={(i) => {this.updateIndex(i)}}
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

    // findWidgetsByMode(topicId) {
    //     this.getServiceByMode().findAllByTopic(topicId)
    //         .then(widgets => this.setState({widgets: widgets}))
    // }

    findWidgetsByMode(topicId, type) {
        console.log(topicId)
        this.getServiceByMode(type)
            .findAllByTopic(topicId)
            .then(widgets => this.setState({widgets: widgets}))
    }


    renderWidgets() {
        let list = null
        var self = this
        if (this.state) {
            list = this.state.widgets.map(
                function (widget, index) {
                    return (
                            <ListItem
                                onPress={() => self.getNavigateOnMode(widget)}
                                key={index}
                                subtitle={widget.description}
                                title={[widget.id] + widget.title}
                                rightIcon={<Icon
                                    name='close'
                                    type='font-awesome'
                                    color='#517fa4'
                                    onPress={() => self.deleteWidget(widget)}
                                />}
                            />
                    )
                }
            )
        }
        return list
    }

    getMode() {
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments':
                return 'assignment'
            case 'Exams':
                return 'exam'
            default:
                return 'widget'
        }
    }

    getNavigateOnMode(widget) {
        var navEle = this.navElement[this.state.selectedIndex]
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments':
                return this.props.navigation.navigate(navEle, {id: widget.id})
            case 'Exams':
                return this.props.navigation.navigate(navEle, {examId: widget.id})
            default:
                return
        }
    }

    deleteWidget(widget) {
        this.widgetService
            .deleteById(widget.id)
            .then(() => this.findWidgetsByMode(this.state.topicId))
    }

    addWidgetToTopic() {
        this.getServiceByMode()
            .addByTopic(this.state.topicId, this.createNewWidgetObject())
            .then((newWidget) => {
                this.findWidgetsByMode(this.state.topicId)
            })
    }

    getServiceByMode(type) {
        if(type === undefined) {
            type = this.state.selectedIndex
        }

        console.log(type)

        switch (this.buttons[type]) {
            case 'Assignments':
                return AssignmentService.instance;
            case 'Exams':
                return ExamService.instance;
            default:
                return AssignmentService.instance
        }
    }

    // getServiceByMode() {
    //     switch (this.buttons[this.state.selectedIndex]) {
    //         case 'Assignments':
    //             return AssignmentService.instance;
    //         case 'Exams':
    //             return ExamService.instance;
    //         default:
    //             return AssignmentService.instance
    //     }
    // }

    createNewWidgetObject() {
        switch (this.buttons[this.state.selectedIndex]) {
            case 'Assignments':
                return {title: 'new assignment', description: 'description', score: '0'};
            case 'Exams':
                return {title: 'new quiz', description: 'description for exam'};
            default:
                return {title: 'new widget'}
        }
    }

}

export default WidgetList