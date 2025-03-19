import React from "react";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const styleTaskItem = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "5px 0",
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdate,
  onDelete,
}) => {
  return (
    <div style={styleTaskItem}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.audioTrack && <audio controls src={task.audioTrack} />}
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate(task.id, { completed: !task.completed })}
        />
      </label>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      {/* Модалка для изменений будет на Edit */}
      <button>Edit</button>
    </div>
  );
};
