const noteServices = {
    getAllNotes(knex){
        return knex.select('*').from('notes');
    },
    getNoteById(knex, id){
        return knex.select('*').from('notes').where({id}).first();
    },
    insertNote(knex, newNote){
        return knex.insert(newNote).into('notes').returning('*')
        .then( rows => rows);
    },
    deleteNote(knex, id){
        return knex.delete().from('notes').where({id});
    }
}

module.exports = noteServices;