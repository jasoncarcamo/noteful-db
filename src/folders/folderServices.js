const folderServices = {
    getAllFolders(knex){
        return knex.select('*').from('folders');
    },
    getFolderById(knex, id){
        return knex.select('*').from('folders').where({id}).first();
    },
    insertFolder(knex, newFolder){
        return knex.insert(newFolder).into('folders').returning('*')
        
    },
    deleteFolder(knex, id){
        return knex.delete().from('folders').where({id});
    }
}

module.exports = folderServices;