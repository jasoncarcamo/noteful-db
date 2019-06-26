const express = require('express');
const folderServices = require('./folderServices');
const folderRouter = express.Router();
const xss = require('xss');

folderRouter.use(express.json());
folderRouter.use(express.urlencoded({extended: true}));

const serializeFolders = folder => ({
    id: xss(folder.id),
    name: xss(folder.name)
});


folderRouter
    .route('/')
    .get((req, res, next) => {

        const db = (req.app.get('db'))

        folderServices.getAllFolders(db)
        .then(folders => {
            res.json(folders.map(serializeFolders));
            console.log(folders)
        })
        .catch(next);
    })
    .post((req,res, next) =>{

        const {id, name} = req.body;
        const newFolder =  {id,name};

        for(const [key, value] of Object.entries(newFolder)){
            console.log(`${key}: ${value}`)
            if(value == null){
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
            }
        }

        folderServices.insertFolder(req.app.get('db'), newFolder)
        .then( data => res.json(data.map(serializeFolders)))
        .catch(next);
    });
    

folderRouter
    .route('/:folderId')
    .get((req, res, next)=>{
        
        folderServices.getFolderById(req.app.get('db'), req.params.folderId).then(data => {
            
            if(!data){
                return res.status(404).json({
                    error: {
                        message: `Folder doesn't exist`
                    }
                })
            }
            return res.json(serializeFolders(data))})
    })
    .delete((req, res, next) =>{

        folderServices.deleteFolder(req.app.get('db'), req.params.folderId).then(rows => {
            if(!rows){
                return res.status(404).json({
                    error: {
                        message: `Folder doesn't exist`
                    }
                })
            }
            res.status(204).send('Ok')})
    })
    





module.exports = folderRouter;