import React from "react";
import { TaskItem } from "../components/TaskItem";
import { Task } from "../types/task";
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  onCreate: (title: string, description: string, audioTrack?: File) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioTrack, setAudioTrack] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(title, description, audioTrack || undefined);
    setTitle("");
    setDescription("");
    setAudioTrack(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>TaskManager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setAudioTrack(e.target.files?.[0] || null)}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Add Task
        </button>
      </form>

      <div>
        {tasks.length === 0 ? (
            <p>Нет задач</p>
        ) : (
            tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))
        )}
      </div>
    </div>
  );
};
