/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from 'react'
import { VideoStateProvider } from './VideoStateContext'

export const UserStateProvider = ({ children = '' as ReactNode }) => {
    return <VideoStateProvider>{children}</VideoStateProvider>
}
