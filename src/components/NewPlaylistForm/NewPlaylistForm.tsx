import { useEffect, useRef } from 'react'

type NewPlaylistFormProps = {
  showForm: boolean
  onCancel?: () => void
  onSubmit?: (data: PlaylistFormData) => void
}
export type PlaylistFormData = {
  title: string
  url: string
}
export const NewPlaylistForm = (props: NewPlaylistFormProps) => {
  const { showForm } = props
  let formClasses = 'new-playlist-form'
  if (showForm === true) formClasses += ' form--active'
  const urlInputRef = useRef<HTMLInputElement>(null)

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const ytPlaylistUrlRegex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:list=)([^&]*)/
    const match = urlInputRef.current?.value.match(ytPlaylistUrlRegex)
    if (match) {
      const playlistFormData = Object.fromEntries(new FormData(e.currentTarget))
      props.onSubmit?.(playlistFormData as PlaylistFormData)
    } else {
      e.currentTarget.reportValidity()
      throw new Error('The URL is not a valid YouTube playlist URL')
    }
  }

  useEffect(() => {
    urlInputRef.current?.setCustomValidity('Please enter a valid YouTube playlist URL')
  }, [])

  function handleFormClicks(e: React.MouseEvent) {
    const target = e.target as HTMLElement
    if (target.className.match('form-cancel')) {
      props.onCancel?.()
    }
  }

  return (
    <form noValidate onSubmit={handleFormSubmit} onClick={handleFormClicks} className={formClasses}>
      <fieldset>
        <legend>New Playlist</legend>
        <input name="title" required type="text" placeholder="Title" />
        <input
          name="url"
          required
          type="url"
          placeholder="youtube playlist url"
          ref={urlInputRef}
        />
        <section className={'form-btns'}>
          <button className="form-cancel" type="button">
            Cancel
          </button>
          <button type="submit">Create</button>
        </section>
      </fieldset>
    </form>
  )
}
