import noteService from '../services/noteService.js'

export const create = async (req, res) => { noteService.create (req, res) }

export const show = async (req, res) => { noteService.show(req, res) }

export const edit = async (req, res) => { noteService.edit(req, res) }

export const remove = async (req, res) => { noteService.remove(req, res) }

const noteController = { create, show, edit, remove }
export default noteController