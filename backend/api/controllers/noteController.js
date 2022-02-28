import noteService from "../services/noteService.js";

export const create = async (req, res) => {
  await noteService.create(req, res);
};

export const show = async (req, res) => {
  await noteService.show(req, res);
};

export const edit = async (req, res) => {
  await noteService.edit(req, res);
};

export const remove = async (req, res) => {
  await noteService.remove(req, res);
};

const noteController = { create, show, edit, remove };
export default noteController;
