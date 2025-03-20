const TaskModel = require("../models/task-model");
const ApiError = require("../exceptions/api-error");
const taskService = require("../services/task-service")

class TaskController {
  async create(req, res, next) {
    try {
      const { title, description, audioTrack } = req.body;
      const userId = req.user.id; //Из мидлвара
      const task = await taskService.create(title, description, audioTrack, userId);
      return res.json(task);
    } catch (e) {
        next(e)
    }
  }

  async getAll(req, res, next) {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getAll(userId);
        return res.json(tasks);
    } catch (e) {
        next(e)
    }
  }

  async getOne(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await taskService.getOne(id, userId);
        return res.json(task)
    } catch (e) {
        next(e);
    }
  }

  async update(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, audioTrack, isCompleted } = req.body;
        const userId = req.user.id;
        const updatedTask = await taskService.update(id, { title, description, audioTrack, isCompleted }, userId)
        return res.json(updatedTask);
    } catch (e) {
        next(e);
    }
  }

  async delete(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = await taskService.delete(id, userId);
        return res.json(result)
    } catch (e) {
        next(e)
    }
  }

}

module.exports = new TaskController();