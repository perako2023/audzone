/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks'

type NowPlayingVideo = {
  id: [string, React.Dispatch<React.SetStateAction<string>>]
}

type UserState = {
  useNowPlayingVideo: NowPlayingVideo
}

type UserStateProviderProps = {
  children: ReactNode
}

export const UserStateContext = createContext<UserState | null>(null)

export const useUserState = () => useContext(UserStateContext)!

const defaultYtVideoId = '3PbpStWW3bM' /* REVIEW - default ytVideoId*/

export const UserStateProvider = ({ children }: UserStateProviderProps) => {
  const useNowPlayingVideoId = useLocalStorage('yt-video-id', defaultYtVideoId)

  return (
    <UserStateContext.Provider
      value={{
        useNowPlayingVideo: {
          id: useNowPlayingVideoId,
        },
      }}>
      {children}
    </UserStateContext.Provider>
  )
}
