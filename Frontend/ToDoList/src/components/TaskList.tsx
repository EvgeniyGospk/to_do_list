import React, { FC, useEffect, useState } from "react";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import TaskService from "../services/TaskService";
import { ITask } from "../models/ITask";
import styles from "./TaskList.module.css";

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.fetchTasks();
      setTasks(response.data);
    } catch (e) {
      console.error("Ошибка при загрузке задач: ", e);
    }
  };

  const handleCreate = async (values: Partial<ITask>) => {
    try {
      if (editingTask) {
        await TaskService.updateTask(editingTask.id, values);
      } else {
        await TaskService.createTask(
          values.title!,
          values.description,
          values.audioTrack
        );
      }
      fetchTasks();
      setIsModalVisible(false);
      setEditingTask(null);
    } catch (e) {
      console.error("Ошибка при сохранении задачи: ", e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TaskService.deleteTask(id);
      fetchTasks();
    } catch (e) {
      console.error("Ошибка при удалении таска: ", e);
    }
  };

  const handleToggleComplete = async (id: number, isCompleted: boolean) => {
    try {
      await TaskService.updateTask(id, { isCompleted });
      fetchTasks();
    } catch (e) {
      console.error("Ошибка при обновлении статуса таска: ", e);
    }
  };

  return (
    <div className={styles.taskList}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        className={styles.createButton}
      >
        Create Task
      </Button>

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalVisible(true);
            }}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </Space>
      <TaskModal
        visible={isModalVisible}
        task={editingTask}
        onCreate={handleCreate}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
};

export default TaskList;
