import React, { FC, useState } from "react";
import { Modal, Form, Input, Button, Tabs, message } from "antd";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

interface AuthModalProps {
  open: boolean;
  onCancel: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const { store } = React.useContext(Context);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError(null);
      if (activeTab === "login") {
        await store.login(values.email, values.password);
      } else {
        await store.registration(values.email, values.password);
      }
      form.resetFields();
      onCancel(); 
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Произошла ошибка, попробуйте снова";
      setError(errorMessage);
      message.error(errorMessage);
      console.error("Ошибка авторизации:", e);
    }
  };

  return (
    <Modal
      open={open}
      title="Авторизация"
      footer={null}
      closable={false} 
      maskClosable={false} 
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "login", label: "Вход" },
          { key: "register", label: "Регистрация" },
        ]}
      />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Некорректный email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        {error && (
          <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {activeTab === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(AuthModal);