import { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Store from './store/store.tsx'

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

const root = document.getElementById('root')

createRoot(root!).render(
  <Context.Provider value={{
    store
  }} >
    <App/>
  </Context.Provider>
)
