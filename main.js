const { application } = require('express');
const express = require('express')
const {Pool} = require('pg')
const app = express();
const PORT = 8002;

const pool = new Pool({
    user: 'mekajames',
    database: 'todo',
    port: 5432,
    password: '',
    host: 'lostHost'
})

app.use(express.static('public'))
//GET ALL
app.get('/todo', async (req,res) => {
try{
const {row} = await pool.query('SELECT * FROM todo');
res.send(row)
}catch(error){
    console.log(error.message)
    res.status(404)
}
})
// //GET
// app.get('/todo/:id', async (req,res) => {
//     try{
    
//     }catch(error){
//         res.send(message.error).status(404)
//     }
//     })
// //CREATE 1
// app.patch('/todo', async (req,res) => {
//     try{
    
//     }catch(error){
//         res.send(message.error).status(404)
//     }
//     })
// //EDIT1 
// app.put('/api/todo', async (req,res) => {
//     try{
    
//     }catch(error){
//         res.send(message.error).status(404)
//     }
//     })
// //DELETE 1
// app.delete('/api/todo', async (req,res) => {
//     try{
    
//     }catch(error){
//         res.send(message.error).status(404)
//     }
//     })






app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

