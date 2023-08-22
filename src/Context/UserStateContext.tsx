/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks'

type UserStateProviderProps = {
  children: ReactNode
}
type UserState = {
  useYtVideoId: [string, React.Dispatch<React.SetStateAction<string>>]
}

export const UserStateContext = createContext<UserState | null>(null)

export const useUserState = () => useContext(UserStateContext)!

const defaultYtVideoId = '3PbpStWW3bM' /* REVIEW - default ytVideoId*/

export const UserStateProvider = ({ children }: UserStateProviderProps) => {
  const [ytVideoId, setYtVideoId] = useLocalStorage(
    'yt-video-id',
    defaultYtVideoId
  )

  return (
    <UserStateContext.Provider
      value={{
        useYtVideoId: [ytVideoId, setYtVideoId],
      }}>
      {children}
    </UserStateContext.Provider>
  )
}
