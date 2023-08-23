/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks'

type UserStateProviderProps = {
  children: ReactNode
}
type UserState = {
  useNowPlayingVideoId: [string, React.Dispatch<React.SetStateAction<string>>]
}

export const UserStateContext = createContext<UserState | null>(null)

export const useUserState = () => useContext(UserStateContext)!

const defaultYtVideoId = '3PbpStWW3bM' /* REVIEW - default ytVideoId*/

export const UserStateProvider = ({ children }: UserStateProviderProps) => {
  const useNowPlayingVideoId = useLocalStorage('yt-video-id', defaultYtVideoId)

  return (
    <UserStateContext.Provider
      value={{
        useNowPlayingVideoId,
      }}>
      {children}
    </UserStateContext.Provider>
  )
}
