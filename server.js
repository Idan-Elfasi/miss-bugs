import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'


import { bugService } from './services/bug.service.js'
import { userService } from './services/user.service.js'
import { loggerService } from './services/logger.service.js'
import { utilService } from './services/util.service.js'

const app = express()

app.use(express.static('app-public'))
app.use(cookieParser())
app.use(express.json())   

// Express Routing:

app.get('/api/bug', (req, res) => {
    const filterBy = {
        title: req.query.title || '',
        severity: +req.query.severity || 0,
        pageIdx: +req.query.pageIdx || 0,
        sortBy: req.query.sortBy || '',
        sortDir: +req.query.sortDir || 1,
        labels: req.query.labels || []
    }
    bugService.query(filterBy)
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
app.get('/api/bug/pageCount', (req, res) => {
    bugService.getPageCount()
        .then(pageCount => res.send(pageCount + ''))
        .catch(err => {
            loggerService.error(`Couldn't get pageCount`, err)
            res.status(500).send(`Couldn't get pageCount`)
        })
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

// AUTH API
app.get('/api/user', (req, res) => {
    userService.query()
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            console.log('Cannot load users', err)
            res.status(400).send('Cannot load users')
        })
})

app.get('/api/user/:userId', (req, res) => {
    const {userId} = req.params
    userService.getById(userId)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log('Cannot load user', err)
            res.status(400).send('Cannot load user')
        })
})

app.post('/api/auth/login', (req, res) => {
    const credentials = req.body
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(401).send('Invalid Credentials')
            }
        })
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body
    userService.save(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(400).send('Cannot signup')
            }
        })
})

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('logged-out!')
})

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('app-public/index.html'))
})

const port = 3030
app.listen(port, () => loggerService.info(`Server ready at port http://127.0.0.1:${port}/`)) 