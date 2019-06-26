require('dotenv').config();
const app = require('./app');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

app.set('db', db);

app.listen(8000, ()=>{
    console.log('Listening on http://localhost:8000');
})