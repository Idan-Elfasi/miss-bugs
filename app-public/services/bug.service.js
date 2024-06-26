
import { utilService } from './util.service.js'
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
    getPageCount,
}


function query(filterBy= {}) {
    return axios.get(BASE_URL,{params:filterBy})
        .then(res => res.data)
        .then(bugs => {
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

function getPageCount(){
    return axios.get(BASE_URL + '/pageCount').then(res => res.data)
}
function getEmptyBug(title = '', severity = '') {
    return { title, severity }
}

function getDefaultFilter() {
    return { title: '', severity: '',pageIdx:0 }
}
