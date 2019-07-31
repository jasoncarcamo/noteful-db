const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const folderRouter = require('./folders/folderRouter');
const notesRouter = require('./notes/notesRouter');


app.use(cors());
app.use(helmet());

app.use('/folders', folderRouter);
app.use('/notes', notesRouter);


app.get('/', (req, res,  next)=>{
    res.send('Hello!')
})

module.exports= app;