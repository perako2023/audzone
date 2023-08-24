import { useState } from 'react'
import MediaPlayer from '../MediaPlayer'
import Playlist from '../Playlist'
import { Navbar, PageTab } from './Navbar'

export const Layout = () => {
  const [activePlaylistUrl, setActivePlaylistUrl] = useState('')

  function handlePlaylistTabChange(newTab: PageTab): void {
    setActivePlaylistUrl(newTab.ytPlaylistUrl ?? '')
  }

  return (
    <div className="root-grid">
      <header className="root__header">
        <button className="menu-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            width="1.5em"
            fill="currentcolor"
            viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <h1>Audzone</h1>
      </header>
      <aside className="root__aside">
        <Navbar onTabChange={handlePlaylistTabChange} />
      </aside>
      <main className="root__main">
        <section className="media-player-wrapper">
          <MediaPlayer />
        </section>
        <section className="playlist-wrapper">
          <Playlist youtubePlaylistUrl={activePlaylistUrl} />
        </section>
      </main>

      <footer className="root__footer"></footer>
    </div>
  )
}
