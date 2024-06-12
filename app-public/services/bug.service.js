
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
    return axios.get(BASE_URL + '/' + bugId + '/remove')
    .then(res => res.data)
}
function save(bug) {
    const queryStr = `/save?title=${bug.title}&severity=${bug.severity}&_id=${bug._id || ''}&description=${bug.description}`
    return axios.get(BASE_URL + queryStr)
        .then(res => res.data)
}
function getEmptyBug(title = '', severity = '') {
    return { title, severity }
}

function getDefaultFilter() {
    return { title: '', severity: '' }
}
