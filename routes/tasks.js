const express = require('express');

const tasksController = require('../controllers/tasks');
const prioritiesController = require('../controllers/priorities');
const authMid = require('../utils/jwt.utils');

const { OK, CREATED } = require('../helpers/status_codes');
const UnauthorizedError = require('../helpers/errors/unauthorized_error'),
  ValidationError = require('../helpers/errors/validation_error'),
  NotFoundError = require('../helpers/errors/validation_error');
const { taskValidation } = require('../validators');

const router = express.Router();

// GET ONLY TASKS FROM AN USER
router.get('/tasks', authMid.authenticateJWT, async (req, res) => {
  const tasksFound = await tasksController.getTasks();

  if (tasksFound) {
    res.status(OK).json(tasksFound);
  } else {
    throw new UnauthorizedError(
      'Unauthorized',
      'You do not have the rights to check these ressources'
    );
  }
});

// POST TASKS FROM AN USER
router.post('/tasks', authMid.authenticateJWT, async (req, res) => {
  console.log('le body weh', req.body);

  const { priority_id } = req.body;
  const errors = taskValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const newTask = await tasksController.addTask(req.body);
  const taskPriority = await prioritiesController.getPriorityById(priority_id);

  return res.status(CREATED).json({
    id: newTask.id,
    name: newTask.name,
    description: newTask.description,
    list_id: newTask.list_id,
    priority_id: taskPriority.name,
    // user_id: newTask.user_id,
  });
});

router.patch('/tasks', authMid.authenticateJWT, async (req, res) => {
  console.log('patch body', req.body);
  const errors = taskValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const taskUpdated = await tasksController.updateTask(req.body);

  if (!taskUpdated) {
    throw new NotFoundError(
      'Not Found',
      'This requested ressource does not exist'
    );
  }
  const taskPriority = await prioritiesController.getPriorityById(
    req.body.priority_id
  );

  return res.status(CREATED).json({
    id: taskUpdated.id,
    name: taskUpdated.name,
    description: taskUpdated.description,
    list_id: taskUpdated.list_id,
    priority_id: taskPriority.name,
  });
});

router.delete('/tasks', authMid.authenticateJWT, async (req, res) => {
  const { id } = req.body;

  const taskFound = await tasksController.getTaskById(id);

  if (!taskFound) {
    throw new NotFoundError(
      'Not Found',
      'The requested ressource does not exist'
    );
  }

  await tasksController.deleteTask(id);
  return res.status(OK).json({
    message: 'The task has been successfully deleted',
  });
});

module.exports = router;
