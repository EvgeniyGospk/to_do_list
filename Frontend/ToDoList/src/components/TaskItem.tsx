import React, { FC } from "react";
import { Card, Checkbox, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ITask } from "../models/ITask";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
}

const TaskItem: FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <Card className="styles.taskCard">
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div className={styles.taskHeader}>
          <Checkbox
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task.id, !task.isCompleted)}
          />
          <span className={task.isCompleted ? styles.completed : ""}>
            {task.title}
          </span>
        </div>
        {task.description && <p>{task.description}</p>}
        {task.audioTrack ? (
          <div className={styles.audioPlaceholder}>[Audio Placeholder]</div>
        ) : null}
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(task)}
            size="small"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(task.id)}
            size="small"
            danger
          >
            Delete
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default TaskItem