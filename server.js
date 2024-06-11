import express from 'express' 
const app = express() 
app.get('/puki', (req, res) => res.send('Hello muki')) 
app.listen(3030, () => console.log('Server ready at port http://127.0.0.1:3030')) 