import React, {FC, useContext, useEffect, useState} from "react"
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if(localStorage.getItem("token")) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data[0])
            console.log(response.data[0])
        } catch (e) {
            console.log(e)
        }
    }

    if(store.isLoading) {
        return <div>Загрузка...</div>
    }

    if(!store.isAuth) {
        return (
            <LoginForm/>
        )
    }

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь авторизирован ${store.user.email}`  : `АВТОРИЗИРУЙТЕСЬ`}</h1>
            <h1>{store.user.isActivated ? "Аккаунт подтвержден по почте" : "Подтвердите аккаунт!!!"}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить пользоветелей</button>
            </div>
            {users.map(user => {
                console.log(user)
                return <div key={user.email}>{user.email}</div>
            }
            )}
        </div>
    )
}

export default observer(App);