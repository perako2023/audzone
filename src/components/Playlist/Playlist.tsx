import css from './Playlist.module.css'

export const Playlist = () => {
  return (
    <ul className={css['playlist']}>
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
      <PlaylistItem />
    </ul>
  )
}

const PlaylistItem = () => {
  const duration = '10:00'
  const imgSrc =
    'https://miro.medium.com/v2/resize:fit:1400/1*sVSPf1ZdHnSSmAfDm328Hg.png'
  const title = 'Title'
  const channelTitle = 'Channel Title'

  return (
    <li className={css['playlist-item']}>
      <div
        className={css['item__thumbnail']}
        style={{ backgroundImage: `url(${imgSrc})` }}
        data-duration={duration}></div>

      <div
        className={css['item__info']}
        data-title={title}
        data-channel-title={channelTitle}></div>
    </li>
  )
}
