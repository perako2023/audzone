import './navbar.css'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks'
import { YT_V3 } from '../../utils'
import NewPlaylistForm, { PlaylistFormData } from '../NewPlaylistForm'
import { PlaylistNavContextMenu } from './PlaylistNavContextMenu'

//NOTE - prefix: "tab-" for switchable tabs nav-link
export type PageTab = {
    title: string
    ytPlaylistId: string
    ytPlaylistUrl: string
}

const PRIMARY_TABS: PageTab[] = [
    /* {
        title: 'Browse',
        id: 'tab-browse',
    }, */
    /* {
        title: 'Settings',
        id: 'tab-settings',
    }, */
    /* {
        title: 'Downloads',
        id: 'tab-downloads',
    }, */
    /* {
        title: 'Library',
        id: 'tab-library',
    }, */
]
type NavbarProps = {
    onTabChange?: (newTab: PageTab | undefined) => void
}
export const Navbar = (props: NavbarProps) => {
    const [showForm, setShowForm] = useState(false)
    const [activeTabId, setActiveTabId] = useLocalStorage('active-tab-id', '')
    const [playlistTabs, setPlaylistTabs] = useLocalStorage<PageTab[]>(
        'playlist-tabs',
        []
    )

    useEffect(() => {
        //* load playlist items if active tab is a playlist by changing the tab
        const playlistTab = playlistTabs.find(
            (playlistTab) => playlistTab.ytPlaylistId === activeTabId
        )
        if (playlistTab?.ytPlaylistUrl) props.onTabChange?.(playlistTab)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleNavbarClick(event: React.MouseEvent) {
        const targetNavLink = event.target as HTMLElement
        if (!targetNavLink.className.match('nav-link')) return

        const newTabId = targetNavLink.dataset.ytId
        if (!newTabId) return
        setActiveTabId(newTabId)
        const targetTab = [...PRIMARY_TABS, ...playlistTabs].find(
            (playlistTab) => playlistTab.ytPlaylistId === newTabId
        )
        if (targetTab) props.onTabChange?.(targetTab)
    }

    function handlePlaylistFormSubmit(playlistFormData: PlaylistFormData) {
        setShowForm(false)
        const playlistId = YT_V3.parsePlaylistId(playlistFormData.url)
        setPlaylistTabs([
            ...playlistTabs,
            {
                title: playlistFormData.title,
                ytPlaylistId: playlistId,
                ytPlaylistUrl: playlistFormData.url,
            },
        ])
    }

    const NavLink = ({ data = {} as PageTab }) => {
        let className = 'nav-link'
        if (data.ytPlaylistId === activeTabId) className += ' active'
        if (data.ytPlaylistUrl) className += ' playlist-nav-link'
        return (
            <a data-yt-id={data.ytPlaylistId} className={className}>
                {data.title}
            </a>
        )
    }

    function handlePlaylistDelete(targetYtId: string): void {
        localStorage.removeItem(`pl-${targetYtId}`)
        const filteredPlaylistTab = playlistTabs.filter(
            (tab) => tab.ytPlaylistId !== targetYtId
        )
        setPlaylistTabs(filteredPlaylistTab)
        setActiveTabId(filteredPlaylistTab[0]?.ytPlaylistId ?? '')
        props.onTabChange?.(filteredPlaylistTab[0])
    }

    return (
        <>
            <NewPlaylistForm
                showForm={showForm}
                onCancel={() => setShowForm(false)}
                onSubmit={handlePlaylistFormSubmit}
            />
            <PlaylistNavContextMenu onDelete={handlePlaylistDelete} />
            <nav className="navbar" onClick={handleNavbarClick}>
                {PRIMARY_TABS.map((primaryTab) => (
                    <NavLink data={primaryTab} key={primaryTab.ytPlaylistId} />
                ))}

                {/* <div className="navbar__divider"></div> */}

                <button
                    className="new-playlist-btn"
                    onClick={() => setShowForm(true)}>
                    <svg
                        fill="currentcolor"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>{' '}
                    New Playlist
                </button>
                <section className="navbar__playlist-wrapper">
                    {playlistTabs.map((playlistTab) => (
                        <NavLink
                            data={playlistTab}
                            key={playlistTab.ytPlaylistId}
                        />
                    ))}
                </section>
            </nav>
        </>
    )
}
