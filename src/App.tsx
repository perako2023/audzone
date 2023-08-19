import './App.css'

export const App = () => {
  return <Layout />
}

const Layout = () => {
  return (
    <div className="root-grid">
      <header className="root__header">
        <button>🍔</button>
        <h1>Audzone</h1>
      </header>
      <aside className="root__aside">
        <nav className="navbar">
          <a className="nav-link">Browse</a>
          <a className="nav-link">Settings</a>
          <a className="nav-link">Downloads</a>
          <a className="nav-link">Library</a>
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
