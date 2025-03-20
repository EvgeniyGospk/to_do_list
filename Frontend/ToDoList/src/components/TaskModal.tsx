import React, { FC } from "react";
import { Modal, Form, Input, Button } from "antd";
import { ITask } from "../models/ITask";

interface TaskModalProps {
  visible: boolean;
  task: ITask | null;
  onCreate: (values: Partial<ITask>) => void;
  onCancel: () => void;
}

const TaskModal: FC<TaskModalProps> = ({
  visible,
  task,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title={task ? "Edit Task" : "Create Task"}
      okText={task ? "Save" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          onCreate(values);
          form.resetFields();
        });
      }}
    >
      <Form form={form} layout="vertical" initialValues={task || {}}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="audioTrack" label="Audio Track">
          <Input placeholder="Audio support coming soon" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;