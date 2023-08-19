import './App.css'

export const App = () => {
  return <Layout />
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
            fill="white"
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
        <section className="media-player">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*sVSPf1ZdHnSSmAfDm328Hg.png"
            alt="thumbnail"
          />
        </section>
        <section className="playlist">
          <ul>
            <li>playable item</li>
            <li>playable item</li>
            <li>playable item</li>
            <li>playable item</li>
          </ul>
        </section>
      </main>

      <footer className="root__footer">Footer</footer>
    </div>
  )
}
