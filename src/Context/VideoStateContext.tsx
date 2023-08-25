/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from 'react'
import { YoutubePlaylistItem } from '../utils/yt_v3'

type VideoState = Partial<YoutubePlaylistItem>

const VideoStateContext = createContext<VideoState | undefined>(undefined)
const VideoStateUpdateContext = createContext<
    React.Dispatch<React.SetStateAction<VideoState>> | undefined
>(undefined)

export const useVideoState = () => useContext(VideoStateContext)!
export const useVideoStateUpdate = () => useContext(VideoStateUpdateContext)!

export const VideoStateProvider = ({ children = '' as ReactNode }) => {
    const [videoState, setVideoState] = useState<VideoState>({
        id: '3PbpStWW3bM',
    })

    return (
        <VideoStateContext.Provider value={videoState}>
            <VideoStateUpdateContext.Provider value={setVideoState}>
                {children}
            </VideoStateUpdateContext.Provider>
        </VideoStateContext.Provider>
    )
}
