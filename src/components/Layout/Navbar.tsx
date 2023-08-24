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
  {
    title: 'Browse',
    id: 'tab-browse',
  },
  {
    title: 'Settings',
    id: 'tab-settings',
  },
  {
    title: 'Downloads',
    id: 'tab-downloads',
  },
  {
    title: 'Library',
    id: 'tab-library',
  },
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
    const playlistTab = playlistTabs.find(
      (playlistTab) => playlistTab.id === activeTabId
    )
    if (playlistTab?.ytPlaylistUrl) props.onTabChange?.(playlistTab)
  }, [])

  /* const [playlistTabs, setPlaylistTabs] = useState<PageTab[]>([
    { id: 'tab-test', title: 'Test Playlist' },
    { id: 'tab-test-1', title: 'Test Playlist 1' },
    { id: 'tab-test-2', title: 'Test Playlist 2' },
  ]) */

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
    if (data.ytPlaylistUrl !== undefined) className += ' playlist-nav-link'
    return (
      <a id={data.id} className={className}>
        {data.title}
      </a>
    )
  }

  return (
    <nav className="navbar" onClick={handleNavbarClick}>
      {PRIMARY_TABS.map((primaryTab) => (
        <NavLink data={primaryTab} key={primaryTab.id} />
      ))}

      <div className="navbar__divider"></div>
      <button className="btn-new-playlist" onClick={() => setShowForm(true)}>
        ➕ New Playlist
      </button>
      <NewPlaylistForm
        showForm={showForm}
        onCancel={() => setShowForm(false)}
        onSubmit={handlePlaylistFormSubmit}
      />

      {playlistTabs.map((playlistTab) => (
        <NavLink data={playlistTab} key={playlistTab.id} />
      ))}
    </nav>
  )
}
