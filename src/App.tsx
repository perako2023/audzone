import './App.css'
import { UserStateProvider } from './Context/UserStateContext'
import Layout from './components/UI'

export const App = () => {
    return (
        <UserStateProvider>
            <Layout />
        </UserStateProvider>
    )
}
