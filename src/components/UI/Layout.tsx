import { useRef, useState } from 'react'
import MediaPlayer from '../MediaPlayer'
import Playlist from '../Playlist'
import { Navbar, PageTab } from './Navbar'
import MenuButton from '../MenuButton'

export const Layout = () => {
    const [activePlaylistUrl, setActivePlaylistUrl] = useState('')
    const asideRef = useRef<HTMLElement>(null)

    function handlePlaylistTabChange(newTab: PageTab | undefined): void {
        setActivePlaylistUrl(newTab?.ytPlaylistUrl ?? '')
    }

    function handleMenuBtnClick(isMenuOpen: boolean) {
        asideRef.current?.classList.toggle('open', isMenuOpen)
    }

    return (
        <div className="root-grid">
            <header className="root__header">
                <MenuButton onClick={handleMenuBtnClick} />
                <h1>Audzone</h1>
            </header>
            <aside ref={asideRef} className="root__aside">
                <Navbar onTabChange={handlePlaylistTabChange} />
            </aside>
            <main className="root__main">
                <section className="media-player-wrapper">
                    <MediaPlayer />
                </section>
                <section className="playlist-wrapper">
                    {activePlaylistUrl ? (
                        <Playlist youtubePlaylistUrl={activePlaylistUrl} />
                    ) : (
                        'Create new playlist to see data'
                    )}
                </section>
            </main>

            <footer className="root__footer"></footer>
        </div>
    )
}
