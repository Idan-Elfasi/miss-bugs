import { utilService } from "./util.service.js"

export const bugService = {
    query,
    getById,
    remove,
    save,
    getPageCount,
}

const  PAGE_SIZE = 3
var bugs = utilService.readJsonFile('./data/bug.json')

function query(filterBy={}) {
    var filterBugs=bugs
    //filterring
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        filterBugs = filterBugs.filter(bug => regExp.test(bug.title))
    }
    if (filterBy.severity) {
        filterBugs = filterBugs.filter(bug => bug.severity >= filterBy.severity)
    }
    //sorting 
    if (filterBy.sortBy) {
        if (filterBy.sortBy === 'title') {
            filterBugs = filterBugs.sort((bug1, bug2) => bug1.title.localeCompare(bug2.title) * filterBy.sortDir)
        } else if (filterBy.sortBy === 'severity') {
            filterBugs = filterBugs.sort((bug1, bug2) => (bug1.severity - bug2.severity) * filterBy.sortDir)
        } else if (filterBy.sortBy === 'createdAt') {
            filterBugs = filterBugs.sort((bug1, bug2) => (bug1.createdAt - bug2.createdAt) * filterBy.sortDir)
        }
    }
    //pagination 
    if(filterBy.pageIdx!==undefined){
        const startIdx = filterBy.pageIdx * PAGE_SIZE
        filterBugs = filterBugs.slice(startIdx, startIdx + PAGE_SIZE )
    }
    return Promise.resolve(filterBugs)
    
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)

    return _saveBugsToFile()
}
function getPageCount() {
    return query().then(bugs => {
        console.log( 'bugs len:' +bugs.length);
        console.log('page size ' + PAGE_SIZE);
        return Math.ceil(bugs.length / PAGE_SIZE)
    })
}
function save(bugToSave) {
    if(bugToSave._id) {
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        bugToSave._id = utilService.makeId()
        bugs.push(bugToSave)
    }
    return _saveBugsToFile()
        .then(() => bugToSave)
}

function _saveBugsToFile() {
    return  utilService.writeJsonFile('./data/bug.json', bugs)
}
