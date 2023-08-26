import { useEffect, useRef } from 'react'

// type PlaylistNavContextMenu = {
//     show: () => void
// }

type PlaylistNavContextMenuProps = {
    onDelete?: (targetYtId: string) => void
}

export const PlaylistNavContextMenu = (props: PlaylistNavContextMenuProps) => {
    const menuRef = useRef<HTMLUListElement | null>(null)
    const targetPlaylistItemRef = useRef<HTMLElement>()

    const move = (e: MouseEvent) => {
        if (menuRef.current) {
            menuRef.current.style.left = `${e.clientX}px`
            menuRef.current.style.top = `${e.clientY}px`
        }
    }
    const hide = () => menuRef.current?.classList.toggle('open', false)
    const show = () => menuRef.current?.classList.toggle('open', true)

    const handleDelete = () => {
        const targetYtId = targetPlaylistItemRef.current?.dataset.ytId
        if (targetYtId) props.onDelete?.(targetYtId)
    }

    useEffect(() => {
        function handleOpenContext(this: Window, e: MouseEvent) {
            e.preventDefault()
            const target = e.target as HTMLElement
            targetPlaylistItemRef.current = target
            move(e)
            if (target.className.match('playlist-nav-link')) show()
            else hide()
        }

        window.addEventListener('click', hide)
        window.addEventListener('contextmenu', handleOpenContext)
        return () => {
            window.removeEventListener('click', hide)
            window.removeEventListener('contextmenu', handleOpenContext)
        }
    }, [])

    return (
        <ul className="playlist-nav-context-menu" ref={menuRef}>
            <li onClick={handleDelete}>delete</li>
        </ul>
    )
}
// export const PlaylistNavContextMenu = forwardRef<
//     PlaylistNavContextMenu,
//     PlaylistNavContextMenuProps
// >((props, ref) => {
//     const menuRef = useRef<HTMLUListElement | null>(null)
//     const targetPlaylistItemRef = useRef<HTMLElement>()

//     const move = (e: MouseEvent) => {
//         if (menuRef.current) {
//             menuRef.current.style.left = `${e.clientX}px`
//             menuRef.current.style.top = `${e.clientY}px`
//         }
//     }
//     const hide = () => menuRef.current?.classList.toggle('open', false)
//     const show = () => menuRef.current?.classList.toggle('open', true)

//     const handleDelete = () => {
//         if (targetPlaylistItemRef.current) {
//             props.onDelete?.(targetPlaylistItemRef.current.id)
//         }
//     }

//     useEffect(() => {
//         function handleOpenContext(this: Window, e: MouseEvent) {
//             e.preventDefault()
//             targetPlaylistItemRef.current = e.target as HTMLElement
//             move(e)
//             const target = e.target as HTMLElement
//             if (target.className.match('playlist-nav-link')) show()
//             else hide()
//         }

//         window.addEventListener('click', hide)
//         window.addEventListener('contextmenu', handleOpenContext)
//         return () => {
//             window.removeEventListener('click', hide)
//             window.removeEventListener('contextmenu', handleOpenContext)
//         }
//     }, [])

//     useImperativeHandle(ref, () => {
//         return {
//             show,
//         }
//     })

//     return (
//         <ul className="playlist-nav-context-menu" ref={menuRef}>
//             <li onClick={handleDelete}>delete</li>
//         </ul>
//     )
// })
