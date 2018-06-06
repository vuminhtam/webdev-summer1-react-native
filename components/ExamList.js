// import React, {Component} from 'react'
// import {View,ScrollView, Alert} from 'react-native'
// import {Text, ListItem} from 'react-native-elements'
// import { Icon } from 'react-native-elements'
// import AssignmentService from "../services/AssignmentService";
// import ExamService from "../services/ExamService";
//
// export default class ExamList extends Component {
//     static navigationOptions = {title: 'Exams'}
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             widgets: [],
//             courseId: '',
//             moduleId: '',
//             topicId: ''
//         }
//         this.examService = ExamService.instance
//         this.addExamToTopic = this.addExamToTopic.bind(this)
//     }
//
//
//     componentDidMount() {
//         const topicId = this.props.id
//         this.setParams(topicId)
//         this.findWidgets(topicId)
//     }
//
//     render() {
//         return (
//             <ScrollView style={{padding: 15}}>
//                 {this.renderAll()}
//
//                 <Icon
//                     raised
//                     color='#f50'
//                     name='plus'
//                     type='font-awesome'
//                     onPress={() => this.addExamToTopic()}
//                 />
//
//             </ScrollView>
//         )
//     }
//
//     findWidgets(topicId) {
//         // const {navigation} = this.props;
//         // const examId = navigation.getParam("lessonId")
//         // const url = "http://localhost:8080/api/topic/" + examId + "/widget"
//         // fetch(url)
//         //     .then(response => (response.json()))
//         //     .then(questions => this.setState({questions: questions}))
//         const url = "http://localhost:8080/api/topic/" + topicId + "/exam"
//         fetch(url)
//             .then(response => (response.json()))
//             .then(widgets => this.setState({questions: widgets}))
//     }
//
//     setParams(topicId) {
//         this.setState({examId: topicId})
//     }
//
//     renderAll() {
//         let list = null
//         var self = this
//         if(this.state) {
//             list = this.state.widgets.map(
//                 function (widget, index) {
//                     return (
//                         <ListItem
//                             onPress={() => self.props.navigation
//                                 .navigate("QuestionList", {examId: widget.id})}
//                             key={index}
//                             subtitle={widget.description}
//                             title={widget.title}
//                             rightIcon={<Icon
//                                 name='cross' />}/>
//                     )
//                 }
//             )
//         }
//         return list
//     }
//
//     addExamToTopic() {
//         this.examService
//             .addByTopic(this.state.topicId,
//                 {title: 'new quiz', description: 'description for exam'})
//             .then(() => this.findWidgets(this.state.topicId))
//     }
// }
//
