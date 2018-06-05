import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}
    constructor(props) {
        super(props)
        this.state = {
            topics: [],
            courseId: '',
            moduleId: '',
            lessonId: ''
        }
    }


    componentDidMount() {

        // const {navigation} = this.props;
        // const courseId = navigation.getParam("courseId")
        // const moduleId = navigation.getParam("moduleId")
        // const lessonId = navigation.getParam("lessonId")
        // const url = "http://localhost:8080/api/course/"+courseId
        //     +"/module/"+moduleId
        //     +"/lesson/"+lessonId
        //     +"/topic"

        const url = "http://localhost:8080/api/course/"+2
            +"/module/"+232
            +"/lesson/"+322
            +"/topic"
        fetch(url)
            .then(response => (response.json()))
            .then(topics => this.setState({topics: topics}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.topics.map(
                    (topic, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {lessonId: topic.id})}
                            key={index}
                            title={topic.title}/>))}
            </View>
        )
    }
}
export default TopicList