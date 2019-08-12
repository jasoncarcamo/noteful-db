const express = require('express');
const notesRouter = express.Router();
const notesServices = require('./notesServices');
const xss = require('xss');


const seralizedNotes = note => ({
    id: xss(note.id),
    name: xss(note.name),
    modified: xss(note.modified),
    folderid: xss(note.folderid),
    content: xss(note.content) 
})

notesRouter.use(express.json());
notesRouter.use(express.urlencoded({extended: true}));


notesRouter
    .route('/')
    .get((req, res, next) => {
        notesServices.getAllNotes(req.app.get('db')).then(data => 
            {   
                
                return res.json(data.map(seralizedNotes))
            });
    })
    .post((req, res, next) => {

        const {id, name, folderid, content} = req.body;

        const newNote = {id, name, folderid, content};

        for(const [key, value] of Object.entries(newNote)){
            if(value == null){
                return res.status(400).json({
                    error: {
                        message: `Missing ${key} in request body`
                    }
                })
            }
        }

        notesServices.insertNote(req.app.get('db'), newNote).then(data => 
            {   
                return res.json(data.map(seralizedNotes))
            })
        .catch(next);
    })


notesRouter
    .route('/:noteId')
    .get((req, res, next) => {
        
        notesServices.getNoteById(req.app.get('db'), req.params.noteId).then(data => {
            if(!data){
                return res.status(404).json({
                    error: {
                        message: `Note does not exist`
                    }
                })
            }
            return res.json(seralizedNotes(data))
        })
        .catch(next);
    })
    .delete((req, res, next) => {
        notesServices.deleteNote(req.app.get('db'), req.params.noteId).then(data => {
            if(!data){
                return res.status(404).json({
                    error: {
                        message: `Note does not exist`
                    }
                })
            }
            return res.status(204).send('Success')
        })
        .catch(next);
    })

module.exports = notesRouter;