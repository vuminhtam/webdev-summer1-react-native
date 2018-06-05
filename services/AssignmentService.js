let _singleton = Symbol();
const REMOTE_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'
const LOCAL_URL = 'http://localhost:8080'
const ASSIGNMENT_API = LOCAL_URL + '/api/assignment'
const TOPIC_ASSIGNMENT_API = LOCAL_URL + '/api/topic/TID/assignment'


export default
class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    findAllAssignments() {
        return fetch(ASSIGNMENT_API)
            .then(response => (response.json()))
    }

    findAllAssignmentsByTopic(tid) {
        return fetch(TOPIC_ASSIGNMENT_API.replace('TID', tid))
            .then(response => (response.json()))
    }

    addByTopic(tid, assignment) {
        return fetch(TOPIC_ASSIGNMENT_API.replace('TID', tid), {
            method: 'post',
            body: JSON.stringify({
                title: assignment.title,
                widgetType: 'Assignment',
                description: assignment.description, score:
                assignment.score}),
            headers: {
                'content-type': 'application/json'}
        }).then(() => alert('Added new assignment!'))
    }

    saveAssignment(assignment) {
        return fetch(TOPIC_ASSIGNMENT_API, {
            method: 'post',
            body: JSON.stringify(assignment),
            headers: {
                'content-type': 'application/json'}
        }).then(() => alert('Changes saved!'))
    }
}
