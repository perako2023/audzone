/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react'
import { YoutubePlaylistItem } from '../utils/yt_v3'
import { useLocalStorage } from '../hooks'

type VideoState = Partial<YoutubePlaylistItem>

const VideoStateContext = createContext<VideoState | undefined>(undefined)
const VideoStateUpdateContext = createContext<
    React.Dispatch<React.SetStateAction<VideoState>> | undefined
>(undefined)

export const useVideoState = () => useContext(VideoStateContext)!
export const useVideoStateUpdate = () => useContext(VideoStateUpdateContext)!

export const VideoStateProvider = ({ children = '' as ReactNode }) => {
    const [videoState, setVideoState] = useLocalStorage<VideoState>(
        'video-state',
        {
            id: '3PbpStWW3bM',
        }
    )

    return (
        <VideoStateContext.Provider value={videoState}>
            <VideoStateUpdateContext.Provider value={setVideoState}>
                {children}
            </VideoStateUpdateContext.Provider>
        </VideoStateContext.Provider>
    )
}
