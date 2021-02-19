const express = require('express');

const listsController = require('../controllers/lists');
const authMid = require('../utils/jwt.utils');

const { OK, CREATED } = require('../helpers/status_codes');
const UnauthorizedError = require('../helpers/errors/unauthorized_error'),
  ValidationError = require('../helpers/errors/validation_error'),
  NotFoundError = require('../helpers/errors/validation_error');
const { listValidation } = require('../validators');

const router = express.Router();

router.get('/lists', authMid.authenticateJWT, async (req, res) => {
  const listsFound = await listsController.getLists();

  if (listsFound) {
    res.status(OK).json(listsFound);
  } else {
    throw new UnauthorizedError(
      'Unauthorized',
      'You do not have the rights to check these ressources'
    );
  }
});

router.post('/lists', authMid.authenticateJWT, async (req, res) => {
  const errors = listValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const newList = await listsController.addList(req.body);

  return res.status(CREATED).json({
    user_id: newList.user_id,
    id: newList.id,
    name: newList.name,
  });
});

router.patch('/lists', authMid.authenticateJWT, async (req, res) => {
  const { id } = req.body;
  const errors = listValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const listUpdated = await listsController.updateList(req.body, id);

  if (!listUpdated) {
    throw new NotFoundError(
      'Not Found',
      'This requested ressource does not exist'
    );
  }

  return res.status(CREATED).json({
    user_id: listUpdated.user_id,
    id: listUpdated.id,
    name: listUpdated.name,
  });
});

router.delete('/lists', authMid.authenticateJWT, async (req, res) => {
  const { id } = req.body;

  const listFound = await listsController.getListById(id);

  if (!listFound) {
    throw new NotFoundError(
      'Not Found',
      'The requested ressource does not exist'
    );
  }

  await listsController.deleteList(id);
  return res.status(OK).json({
    message: 'The list has been successfully deleted',
  });
});

module.exports = router;
