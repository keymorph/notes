const noteServices = require('../services/noteServices');

// (CREATE) Create a new note.
exports.create = async (req, res) => {
    noteServices.create(req, res);
}

// (READ) Show all notes.
exports.show = async (req, res) => {
    noteServices.show(req, res);
}

// (UPDATE) Edit an existing note.
exports.edit = async (req, res) => {
    noteServices.edit(req, res);
}

// (DELETE) Remove a user note.
exports.delete = async (req, res) => {
    noteServices.delete(req, res);
}