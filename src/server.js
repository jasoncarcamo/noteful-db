require('dotenv').config();
const app = require('./app');
const knex = require('knex');
const PORT = process.env.PORT || 8000;

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
})

app.set('db', db);

app.listen(PORT, ()=>{
    console.log('Listening on http://localhost:8000');
})