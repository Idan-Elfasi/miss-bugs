import express from 'express' 


import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express() 



app.get('/api/bug', (req, res) =>{
    bugService.query()
    .then(bugs=>res.send(bugs))
    .catch(err=>{
        console.log(err);
        loggerService.error(`Couldn't get bugs `)
        res.status(500).send(`Couldn't get bugs`)
    })
})

app.get('/api/bug/save', (req, res) =>{
    const {_id,title,severity}=req.query
    const bugToSave={_id:_id||'',title,severit:+severity,}

    bugService.save(bugToSave)
    .then(savedBug=>res.send(savedBug))
})

 app.get('/api/bug/:id', (req, res) =>{
    const {id} = req.params

    bugService.getById(id)
    .then(bug => res.send(bug))

}) 
 app.get('/api/bug/:id/remove', (req, res) =>{
    const {id} = req.params
    bugService.remove(id)
    .then(() => res.send(`Bug ${id} deleted...`))
}) 
app.get('/puki', (req, res) =>{

    res.send(`Hello puki`)
}) 


const port = 3030
app.listen(port, () => loggerService.info(`Server ready at port http://127.0.0.1:${port}/`)) 