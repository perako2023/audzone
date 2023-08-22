import './App.css'
import MediaPlayer from './components/MediaPlayer'
import Playlist from './components/Playlist'
import { UserStateProvider } from './Context/UserStateContext'

export const App = () => {
  return (
    <UserStateProvider>
      <Layout />
    </UserStateProvider>
  )
}

const Layout = () => {
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
        <nav className="navbar">
          <a className="nav-link">Browse</a>
          <a className="nav-link">Settings</a>
          <a className="nav-link">Downloads</a>
          <a className="nav-link active">Library</a>
        </nav>
      </aside>
      <main className="root__main">
        <section className="media-player-wrapper">
          <MediaPlayer />
        </section>
        <section className="playlist-wrapper">
          <Playlist youtubePlaylistUrl="https://www.youtube.com/watch?v=3PbpStWW3bM&list=PLOV5noHgXBgPJkoP1nHAxBefXs0mO-foo&index=2" />
        </section>
      </main>

      <footer className="root__footer"></footer>
    </div>
  )
}
