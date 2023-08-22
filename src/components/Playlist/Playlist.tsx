import { useEffect, useState } from 'react'
import css from './Playlist.module.css'
import { PlaylistItemData, YT_V3 } from '../../utils/yt_v3'

type PlaylistProps = {
  title?: string /* REVIEW - not optional? */
  youtubePlaylistUrl: string /* TODO - maybe convert type to only allow youtube playlist url */
}

export const Playlist = (props: PlaylistProps) => {
  const { youtubePlaylistUrl } = props
  console.log(youtubePlaylistUrl)
  const [items, setItems] = useState<PlaylistItemData[]>()

  useEffect(() => {
    const regex = /^.*(youtu.be\/|list=)([^#&?]*).*/
    const match = youtubePlaylistUrl.match(regex)
    /* check if url is a valid youtube playlist url */
    if (match && match[2]) {
      console.log(
        `The URL is a valid YouTube playlist URL with id: ${match[2]}`
      )
      getVideos(youtubePlaylistUrl).then((items) => setItems(items))
    } else {
      console.log('The URL is not a valid YouTube playlist URL')
    } /* REVIEW - check if youtubePlaylistUrl is a valid youtube playlist URL */
  }, [youtubePlaylistUrl])

  return (
    <ul className={css['playlist']}>
      {items?.map((item) => {
        return <PlaylistItem {...item} key={item.id} />
      })}
    </ul>
  )
}

// type PlaylistItemProps = {}
const PlaylistItem = (props: PlaylistItemData) => {
  const { duration, thumbnailUrl, title, channelTitle, id } = props

  return (
    <li className={css['playlist-item']} id={id}>
      <div
        className={css['item__thumbnail']}
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
        data-duration={YT_V3.formatDuration(duration, 'colon')}></div>

      <div
        className={css['item__info']}
        data-title={title}
        data-channel-title={channelTitle}></div>
    </li>
  )
}

async function getVideos(playlistUrl: string) {
  /* TODO - add error handler */
  const localPlaylistData = JSON.parse(
    localStorage.getItem(`pl-${YT_V3.parsePlaylistId(playlistUrl)}`)!
  )
  if (localPlaylistData !== null) {
    console.log('local data is being used')
    return localPlaylistData
  } else {
    console.log('fetch data is being used')
    const items = await YT_V3.getPlaylistVideos(playlistUrl)
    localStorage.setItem(
      `pl-${YT_V3.parsePlaylistId(playlistUrl)}`,
      JSON.stringify(items)
    )
    return items
  }
}
