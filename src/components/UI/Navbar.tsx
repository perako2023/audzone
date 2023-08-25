import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks'
import { YT_V3 } from '../../utils'
import NewPlaylistForm, { PlaylistFormData } from '../NewPlaylistForm'

export type PageTab = {
    title: string
    id: `tab-${string}` //NOTE - prefix: "tab-" for switchable tabs nav-link
    ytPlaylistUrl?: string
}

const PRIMARY_TABS: PageTab[] = [
    /* {
        title: 'Browse',
        id: 'tab-browse',
    }, */
    {
        title: 'Settings',
        id: 'tab-settings',
    },
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
    onTabChange?: (newTab: PageTab) => void
}
export const Navbar = (props: NavbarProps) => {
    const [showForm, setShowForm] = useState(false)
    const [activeTabId, setActiveTabId] = useLocalStorage(
        'active-tab-id',
        'tab-library'
    )
    const [playlistTabs, setPlaylistTabs] = useLocalStorage<PageTab[]>(
        'playlist-tabs',
        []
    )

    useEffect(() => {
        //* load playlist items if active tab is a playlist by changing the tab
        const playlistTab = playlistTabs.find(
            (playlistTab) => playlistTab.id === activeTabId
        )
        if (playlistTab?.ytPlaylistUrl) props.onTabChange?.(playlistTab)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleNavbarClick(event: React.MouseEvent) {
        const targetNavLink = event.target as HTMLElement
        if (targetNavLink.className.match('nav-link')) {
            const newTabId = targetNavLink.id
            setActiveTabId(newTabId)
            const targetTab = [...PRIMARY_TABS, ...playlistTabs].find(
                (playlistTab) => playlistTab.id === newTabId
            )
            props.onTabChange?.(targetTab!)
        }
    }

    function handlePlaylistFormSubmit(playlistFormData: PlaylistFormData) {
        setShowForm(false)
        const playlistId = YT_V3.parsePlaylistId(playlistFormData.url)
        setPlaylistTabs([
            ...playlistTabs,
            {
                title: playlistFormData.title,
                id: `tab-${playlistId}`,
                ytPlaylistUrl: playlistFormData.url,
            },
        ])
    }

    const NavLink = ({ data }: { data: PageTab }) => {
        let className = 'nav-link'
        if (data.id === activeTabId) className += ' active'
        if (data.ytPlaylistUrl) className += ' playlist-nav-link'
        return (
            <a id={data.id} className={className}>
                {data.title}
            </a>
        )
    }

    return (
        <>
            <NewPlaylistForm
                showForm={showForm}
                onCancel={() => setShowForm(false)}
                onSubmit={handlePlaylistFormSubmit}
            />
            <nav className="navbar" onClick={handleNavbarClick}>
                {PRIMARY_TABS.map((primaryTab) => (
                    <NavLink data={primaryTab} key={primaryTab.id} />
                ))}

                <div className="navbar__divider"></div>

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
                        <NavLink data={playlistTab} key={playlistTab.id} />
                    ))}
                </section>
            </nav>
        </>
    )
}
