const express = require('express')
const { Pool } = require('pg')
const app = express();
const PORT = 8002;
const cors = require('cors')// relax security in a api, and put up more security


const pool = new Pool({
    user: 'mekajames',
    database: 'todo_list_dev',
    port: 5432,
    password: '',
    host: 'localhost'
})
app.use(express.json())
app.use(express.static('public'))
app.use(cors())


// GET ALL
app.get('/todo', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM todo;');
        res.send(data.rows).status(200)
    } catch (error) {
        console.error(error.message);
    }
})
// GET 1
app.get('/todo/:id', async (req, res) => {
    try {
        let { id } = req.params; // equal the value of the id on line 23, 
        let { rows } = await pool.query('SELECT * FROM todo WHERE id = $1;', [id]);// [] what ever we pass inside the array is the value we need. 
        res.send(rows).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(400);
    }
})
// CREATE 1
app.post('/todo', async (req, res) => {

    try {
        const { name, getdate, goals } = req.body;// res.body - is a empty object{}
        let rest = await pool.query('INSERT INTO todo ( name,getdate,goals) VALUES($1, $2, $3) RETURNING *;', [ name,getdate,goals]);
        res.send(rest.rows).status(200);
        // let test = req.body; // go to the body on postman like order off amazon app
        // res.send(test); // tell amazon thank you; like postman.
        // console.log(test)

    } catch (error) {
        console.error(error.message);
        res.status(400);
    }
})
//DElETE 1
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('DELETE FROM todo WHERE id = $1;', [id]);
        res.json(rows)
    } catch (error) {
        console.error(error.message);
        res.status(400);
    }
})
// UPDATE 1 put/patch adding a condition 
app.patch('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, getdate, goals } = req.body;

        if (!name || !getdate || !goals) {
            if (name) {
                await pool.query('Update todo SET name = $1 WHERE id = $2;', [name, id]);
            }
            if (getdate) {
                await pool.query('Update todo SET age = $1 WHERE id = $2;', [getdate, id]);
            }
            if (goals) {
                await pool.query('Update todo SET goals = $1 WHERE id = $2;', [goals, id]);
            }
        } else {
            if (name, getdate, goals) {
                await pool.query('Update todo SET name = $1, getdate= $2, goals= $3 WHERE id = $4;', [name, getdate, goals, id]);
            }
        }
        const { rows } = await pool.query('SELECT * FROM todo;');
        res.send(rows);
    } catch (error) {
        console.error(error.message);
        res.status(400);
    }
});



app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

module.exports = app;