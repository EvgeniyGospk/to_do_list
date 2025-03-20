import React, { FC, useContext, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import AuthModal from "./components/AuthModal";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { Button, Layout, Typography } from "antd";
import styles from "./App.module.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: FC = () => {
  const { store } = useContext(Context);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  useEffect(() => {
    setIsAuthModalOpen(!store.isAuth && !store.isLoading);
  }, [store.isAuth, store.isLoading]);

  if (store.isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={3} className={styles.title}>
          ToDo List
        </Title>
        {store.isAuth && (
          <Button type="link" onClick={() => store.logout()}>
            Выйти
          </Button>
        )}
      </Header>
      <Content className={styles.content}>
        {store.isAuth ? (
          <>
            <Title level={4}>
              Пользователь: {store.user.email}
              {store.user.isActivated
                ? " (подтвержден)"
                : " (подтвердите аккаунт)"}
            </Title>
            <TaskList />
          </>
        ) : null}
        <AuthModal
          open={isAuthModalOpen}
          onCancel={() => setIsAuthModalOpen(false)}
        />
      </Content>
    </Layout>
  );
};

export default observer(App);