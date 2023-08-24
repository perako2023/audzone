import './App.css'
import { UserStateProvider } from './Context/UserStateContext'
import Layout from './components/Layout'

export const App = () => {
  return (
    <UserStateProvider>
      <Layout />
    </UserStateProvider>
  )
}
