import { useEffect, useState } from 'react'
import css from './Playlist.module.css'
import { YoutubePlaylistItem, YT_V3 } from '../../utils/yt_v3'
import {
    useVideoState,
    useVideoStateUpdate,
} from '../../Context/VideoStateContext'

export const Playlist = ({ youtubePlaylistUrl = '' }) => {
    console.count('Playlist render: ')
    const [playlistItems, setPlaylistItems] = useState<YoutubePlaylistItem[]>(
        []
    )
    const updateVideoState = useVideoStateUpdate()

    useEffect(() => {
        const regex = /^.*(youtu.be\/|list=)([^#&?]*).*/
        const match = youtubePlaylistUrl.match(regex)
        //* check if url is a valid youtube playlist url
        if (match?.[2]) {
            console.log(
                `The URL is a valid YouTube playlist URL with id: ${match[2]}`
            )
            getVideos(youtubePlaylistUrl).then((items) =>
                setPlaylistItems(items)
            )
        } else {
            console.error('The URL is not a valid YouTube playlist URL\n')
        }
    }, [youtubePlaylistUrl])

    function handlePlaylistClick(event: React.MouseEvent): void {
        const targetPlaylistItem = event.target as HTMLLIElement
        if (!targetPlaylistItem.className.match('playlist-item')) return
        const targetItemId = targetPlaylistItem.dataset.ytVideoId!
        const newVideoState = playlistItems.find(
            (item) => item.id === targetItemId
        )
        if (newVideoState) updateVideoState(newVideoState)
    }

    return (
        <ul className={css['playlist']} onClick={handlePlaylistClick}>
            {playlistItems?.map((item) => {
                return <PlaylistItem {...item} key={item.id} />
            })}
        </ul>
    )
}

// type PlaylistItemProps = {}
const PlaylistItem = (props: YoutubePlaylistItem) => {
    const { duration, thumbnailUrl, title, channelTitle, id } = props
    const { id: nowPlayingVideoId } = useVideoState()
    const nowPlayingClass = nowPlayingVideoId === id ? css['now-playing'] : ''

    return (
        <li
            className={`${css['playlist-item']} ${nowPlayingClass}`}
            data-yt-video-id={id}>
            <div
                className={css['item__thumbnail']}
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                data-duration={YT_V3.formatDuration(duration, 'colon')}
            />

            <div
                className={css['item__info']}
                data-title={title}
                data-channel-title={channelTitle}
            />
        </li>
    )
}

async function getVideos(playlistUrl: string) {
    /* TODO - add error handler */
    const localPlaylistData = JSON.parse(
        localStorage.getItem(`pl-${YT_V3.parsePlaylistId(playlistUrl)}`)!
    )
    if (localPlaylistData === null) {
        console.log('fetch data is being used')
        const items = await YT_V3.getPlaylistVideos(playlistUrl)
        localStorage.setItem(
            `pl-${YT_V3.parsePlaylistId(playlistUrl)}`, //NOTE - prefix: "pl-" for playlist Id
            JSON.stringify(items)
        )
        return items
    } else {
        console.log('local data is being used')
        return localPlaylistData
    }
}
