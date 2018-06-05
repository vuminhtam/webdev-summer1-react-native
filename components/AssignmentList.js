import React, {Component} from 'react'
import {ScrollView, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import {Icon} from 'react-native-elements'

class AssignmentList extends Component {
    static navigationOptions = {title: 'Assignments'}

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         topicId: '',
    //         assignments: []
    //     }
    //     this.assignmentService = AssignmentService.instance
    //     this.addAssignmentToTopic = this.addAssignmentToTopic.bind(this)
    // }
    //
    // componentDidMount() {
    //     this.setParams(this.props.id)
    //     this.findWidgets()
    // }
    //
    // setParams(topicId) {
    //     this.setState({topicId: topicId})
    //     console.log(this.state)
    // }
    //
    // //
    // // componentDidMount() {
    // //     // const {navigation} = this.props;
    // //     // const topicId = navigation.getParam("topicId")
    // //     const topicId = this.props.id
    // //     const url = "http://localhost:8080/api/topic/" + topicId + "/assignment"
    // //     console.log(url)
    // //     fetch(url)
    // //         .then(response => (response.json()))
    // //         .then(widgets => this.setState({assignments: widgets}))
    // // }
    //
    // render() {
    //     return (
    //         <ScrollView style={{padding: 15}}>
    //             {/*{this.state.assignments.map(*/}
    //                 {/*(item, index) => (*/}
    //                     {/*<ListItem*/}
    //                         {/*onPress={() => this.props.navigation*/}
    //                             {/*.navigate("Assignment", {assignmentId: item.id})}*/}
    //                         {/*key={index}*/}
    //                         {/*subtitle={item.description}*/}
    //                         {/*title={item.title}/>))}*/}
    //
    //             {this.renderAll()}
    //
    //             <Icon
    //                 raised
    //                 color='#f50'
    //                 name='plus'
    //                 type='font-awesome'
    //                 onPress={() => this.addAssignmentToTopic()}
    //             />
    //         </ScrollView>
    //     )
    // }
    //
    // findWidgets() {
    //     // const url = "http://localhost:8080/api/topic/" + topicId + "/assignment"
    //     // fetch(url)
    //     //     .then(response => (response.json()))
    //     const topicId = this.state.topicId
    //     console.log(this.state)
    //     this.assignmentService.findAllAssignmentsByTopic(topicId)
    //         .then(widgets => this.setState({assignments: widgets}))
    // }
    //
    // renderAll() {
    //     let list = null
    //     var self = this
    //     if(this.state) {
    //         list = this.state.assignments.map(
    //             function (widget, index) {
    //                 return (
    //                     <ListItem
    //                         onPress={() => self.props.navigation
    //                             .navigate("Assignment", {assignmentId: item.id})}
    //                         key={index}
    //                         subtitle={widget.description}
    //                         title={widget.title}/>)
    //             }
    //         )
    //     }
    //     return list
    // }
    //
    // addAssignmentToTopic() {
    //     this.assignmentService
    //         .addByTopic(this.state.topicId,
    //             {title: 'new assignment', description: 'description', score: '0'})
    //         .then(() => this.findWidgets())
    // }


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
        const topicId = this.props.id
        this.setParams(topicId)
        this.findWidgets(topicId)
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <Text>EDITING {this.state.widgets.length} ASSIGNMENTS</Text>
                {this.renderAll()}
                <Icon
                    raised
                    color='#f50'
                    name='plus'
                    type='font-awesome'
                    onPress={() => this.addAssignmentToTopic()}
                />
            </ScrollView>
        )
    }

    findWidgets(topicId) {
        this.assignmentService.findAllAssignmentsByTopic(topicId)
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
                                .navigate("AssignmentEditor", {id: widget.id})}
                            key={index}
                            subtitle={widget.description}
                            title={widget.title}/>)
                }
            )
        }
        return list
    }

    addAssignmentToTopic() {
        this.assignmentService
            .addByTopic(this.state.topicId,
                {title: 'new assignment', description: 'description', score: '0'})
            .then(() => this.findWidgets(this.state.topicId))
    }

}

export default AssignmentList