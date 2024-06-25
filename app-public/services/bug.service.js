
import { utilService } from './util.service.js'
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
}


function query(filterBy= {}) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                bugs = bugs.filter(bug => regExp.test(bug.title))
            }
            if (filterBy.severity) {
                bugs = bugs.filter(bug => bug.severity >= filterBy.severity)
            }
            return bugs
        })
}
function getById(bugId) {
    return axios.get(BASE_URL + '/' + bugId)
    .then(res => res.data)
}
function remove(bugId) {
    return axios.delete(BASE_URL + '/' + bugId )
    .then(res => res.data)
}
function save(bug) {
    if(bug._id){
        return axios.put(BASE_URL + '/' + bug._Id ,bug)
        .then(res => res.data)
    }
    else{
        return axios.post(BASE_URL ,bug)
        .then(res => res.data)
    }
}
function getEmptyBug(title = '', severity = '') {
    return { title, severity }
}

function getDefaultFilter() {
    return { title: '', severity: '' }
}
