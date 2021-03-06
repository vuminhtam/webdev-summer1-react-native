let _singleton = Symbol();
const REMOTE_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'
const LOCAL_URL = 'http://localhost:8080'
const EXAM_API = REMOTE_URL + '/api/exam'
const EXAM_TOPIC_API = REMOTE_URL + '/api/topic/TID/exam'


export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    findAll() {
        return fetch(EXAM_API)
            .then(response => (response.json()))
    }

    findAllByTopic(tid) {
        return fetch(EXAM_TOPIC_API.replace('TID', tid))
            .then(response => (response.json()))
    }

    addByTopic(tid, assignment) {
        return fetch(EXAM_TOPIC_API.replace('TID', tid), {
            method: 'post',
            body: JSON.stringify({
                title: assignment.title,
                widgetType: 'Exam',
                description: assignment.description}),
            headers: {
                'content-type': 'application/json'}
        }).then(() => alert('Added new exam!'))
    }
}
