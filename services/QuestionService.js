let _singleton = Symbol();
const REMOTE_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'
const LOCAL_URL = 'http://localhost:8080'
const QUESTION_API = REMOTE_URL + '/api/question'
const EXAM_QUESTION_API = REMOTE_URL + '/api/exam/EID'
const QUESTION_TYPE_API = REMOTE_URL + '/api/TYPE'


export default class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    findAll() {
        return fetch(QUESTION_API)
            .then(response => (response.json()))
    }

    findAllByExam(examiD) {
        return fetch(EXAM_QUESTION_API.replace('EID', examiD) + '/question')
            .then(response => (response.json()))
    }

    findAllByExamByType(examId, type) {
        return fetch(EXAM_QUESTION_API.replace('EID', examId) + '/' + type)
            .then(response => (response.json()))
    }

    addByExam(eid, question, type) {
        return fetch(EXAM_QUESTION_API.replace('EID', eid) + '/' + type, {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'}
        }).then((response) => alert('Added!'))
    }

    deleteById(id) {
        return fetch(QUESTION_API + '/' + id, {method: 'DELETE'})
            .then(response => (response.json()))
    }

    findQuestionById(id) {
        return fetch(QUESTION_API + '/' + id)
            .then(response => (response.json()))
    }

    findQuestionByTypeAndId(id, type) {
        return fetch(QUESTION_TYPE_API.replace('TYPE', type) + '/' + id)
            .then(response => (response.json()))
    }

    updateQuestionById(eid, newQuestion) {
        return fetch(EXAM_QUESTION_API.replace('EID', eid) + '/' + newQuestion.type + '/' + newQuestion.id, {
            method: 'post',
            body: JSON.stringify(newQuestion),
            headers: {
                'content-type': 'application/json'}
        }).then((response) => (response.json()))
    }
}
