import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {FixedHeader} from './elements/FixedHeader'
import {TextHeadings} from './elements/TextHeadings'
import {Icons} from './elements/Icons'
import Exam from "./elements/Exam";
import QuestionTypeButtonGroupChooser from "./elements/QuestionTypeButtonGroupChooser";
import QuestionTypePicker from "./elements/QuestionTypePicker";
import MultipleChoiceQuestionEditor from "./elements/MultipleChoiceQuestionEditor";
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'

class Home extends React.Component {
    static navigationOptions = {title: 'Home'}

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>

                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA')}/>
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB')}/>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>
                <QuestionTypeButtonGroupChooser/>
                <QuestionTypePicker/>
                <TextHeadings/>
                <MultipleChoiceQuestionEditor/>
                <Exam/>
                <Icons/>
            </ScrollView>
        )
    }
}

class screenA extends React.Component {
    static navigationOptions = {title: "Screen A"}

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation.goBack()} />
            </View>
        )
    }
}

class screenB extends React.Component {
    static navigationOptions = {title: "Screen B"}

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <Text>Screen B</Text>
            </ScrollView>
        )
    }
}

const App = createStackNavigator({
    Home: {screen: Home},
    ScreenA: {screen: screenA},
    ScreenB: {screen: screenB},
    ScreenX: {screen: screenX},
})

export default App

// export default class App extends React.Component {
//     render() {
//         return (
//             <Home/>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
