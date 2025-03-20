const TaskModel = require("../models/task-model");
const ApiError = require("../exceptions/api-error");

class TaskService {
    async create(title, description, audioTrack, userId) {
        if(!title) {
            throw ApiError.BadRequest("Название задачи обязательно")
        }

        const task = await TaskModel.create({
            title,
            description,
            audioTrack,
            userId
        });
        console.log("Создали " + task)
        return task
    }

    async getAll(userId) {
        const tasks = await TaskModel.findAll({where: {userId}, order: [["id", "ASC"]]})
        return tasks
    }

    async getOne(id, userId) {
        const task = await TaskModel.findOne({
            where: {id, userId},
        });

        if(!task) {
            throw ApiError.BadRequest("Задача не найдена или не принадлежит вам")
        }

        return task
    } 

    async update(id, updates, userId) {
        const task = await TaskModel.findOne({
            where: {id, userId}
        });

        if(!task) {
            throw ApiError.BadRequest("Задача не найдена или не принадлежит вам")
        }

        const { title, description, audioTrack, isCompleted } = updates;
        task.title = title || task.title;
        task.description = description || task.description;
        task.audioTrack = audioTrack || task.audioTrack;
        task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
        
        await task.save()
        return task;
    }

    async delete(id, userId) {
        const task = await TaskModel.findOne({
            where: {id, userId},
        })

        if(!task) {
            throw ApiError.BadRequest("Задача не найдена или не принадлежит вам")
        }

        await task.destroy();
        return {message: "Задача удалена"}
    }
}

module.exports = new TaskService();