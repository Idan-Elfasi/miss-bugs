import express from 'express'


import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'
import { utilService } from './services/util.service.js'

const app = express()
app.use(express.static('app-public'))
app.use(express.json())   

// Express Routing:

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            console.log(err);
            loggerService.error(`Couldn't get bugs `)
            res.status(500).send(`Couldn't get bugs`)
        })
})

app.put('/api/bug/:id', (req, res) => {
    const { _id, title, severity, description } = req.body


    const createdAt = utilService.makeCreatedAt()
    const labels = utilService.makeLabels()

    const bugToSave = {
         _id: _id || ''
         , title:title||''
         , severity: +severity||0
         , description:description||''
         , createdAt: +createdAt
         , labels }

    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
})
app.post('/api/bug/', (req, res) => {
    const {  title, severity, description } = req.body

    const createdAt = utilService.makeCreatedAt()
    const labels = utilService.makeLabels()

    const bugToSave = {  title:title||'', severity: +severity, description, createdAt: +createdAt, labels }

    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
})

app.get('/api/bug/:id', (req, res) => {
    const { id } = req.params

    bugService.getById(id)
        .then(bug => res.send(bug))

})
app.delete('/api/bug/:id', (req, res) => {
    const { id } = req.params
    bugService.remove(id)
        .then(() => res.send(`Bug ${id} deleted...`))
})
app.get('/puki', (req, res) => {

    res.send(`Hello puki`)
})


const port = 3030
app.listen(port, () => loggerService.info(`Server ready at port http://127.0.0.1:${port}/`)) 