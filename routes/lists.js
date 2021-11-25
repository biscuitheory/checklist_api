const express = require('express');

const listsController = require('../controllers/lists');
const authMid = require('../utils/jwt.utils');

const { OK, CREATED } = require('../helpers/status_codes');
const UnauthorizedError = require('../helpers/errors/unauthorized_error'),
  ValidationError = require('../helpers/errors/validation_error'),
  NotFoundError = require('../helpers/errors/validation_error');
const { listValidation } = require('../validators');

const router = express.Router();

// GET ONLY LISTS OF AN USER
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

// GET ONLY LISTS OF AN USER
router.post('/onlylists', authMid.authenticateJWT, async (req, res) => {
  const { user_id } = req.body;
  const listsFound = await listsController.getLists(user_id);

  if (listsFound) {
    res.status(OK).json(listsFound);
  } else {
    throw new UnauthorizedError(
      'Unauthorized',
      'You do not have the rights to check these ressources'
    );
  }
});

// GET ALL THE LISTS + CORRESPONDING TASKS OF AN USER
router.post('/liststasks', authMid.authenticateJWT, async (req, res) => {
  const { user_id } = req.body;
  // console.log('this is the body', req.body);

  const listTasksFound = await listsController.getListsTasks(user_id);

  if (listTasksFound) {
    res.status(OK).json(listTasksFound);
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
    id: newList.id,
    user_id: newList.user_id,
    name: newList.name,
    // rank: newList.rank,
    createdAt: newList.createdAt,
    updatedAt: newList.updatedAt,
  });
});

router.patch('/lists', authMid.authenticateJWT, async (req, res) => {
  // console.log('le body de la sorted list', req.body);
  const errors = listValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const listUpdated = await listsController.updateList(req.body);

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
    // rank: listUpdated.rank,
  });
});

router.delete('/lists', authMid.authenticateJWT, async (req, res) => {
  const { id } = req.body;
  console.log('body delete', req.body);

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
