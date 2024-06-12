
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


function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     bugs = bugs.filter(bug => regExp.test(bug.title))
            // }
            // if (filterBy.minSeverity) {
            //     bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
            // }
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
    const queryStr = `/save?title=${bug.title}&severity=${bug.severity}&_id=${bug._id || ''}`
    return axios.get(BASE_URL + queryStr)
        .then(res => res.data)
}
function getEmptyBug(title = '', severity = '') {
    return { title, severity }
}

function getDefaultFilter() {
    return { title: '', Severity: '' }
}
