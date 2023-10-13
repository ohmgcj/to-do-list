const service = require('../services/crud.service');

const SearchList = async (req, res) => {
  const result = await service.searchList();

  res.status(200).json({
    status: 200,
    message: 'Success',
    data: {
      todo: result,
    },
  });
};

const CreateList = async (req, res) => {
  const payload = req.body; // Pega os dados passados pelo usuário

  const result = await service.createList(
    payload.status_id,
    payload.title,
    payload.description,
  );

  return res.status(201).json({
    status: 201,
    message: 'Created',
    data: {
      todo: result,
    },
  });
};

const UpdateList = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await service.updateList(
    id,
    payload.status_id,
    payload.title,
    payload.description,
  );

  res.status(200).json({
    status: 200,
    message: 'Updated',
    data: {
      todo: result,
    },
  });
};

const UpdateStatus = async (req, res) => {
  const { id, status } = req.params; // Desestrutura o objeto e recebe no ".params"
  const result = await service.editStatus(id, status);

  res.status(200).json({
    status: 200,
    message: 'Updated',
    data: {
      todo: result,
    },
  });
};

const DeleteList = async (req, res) => {
  const { id } = req.params;
  const result = service.deleteList(id);

  res.status(200).json({
    status: 200,
    message: 'Updated',
    data: {
      todo: result,
    },
  });
};

module.exports = {
  SearchList,
  CreateList,
  UpdateList,
  UpdateStatus,
  DeleteList,
};
