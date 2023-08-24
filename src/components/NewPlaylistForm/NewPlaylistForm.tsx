import { FormEvent } from 'react'

type NewPlaylistFormProps = {
  showForm: boolean
  onCancel?: () => void
  onSubmit?: (data: PlaylistFormData) => void
}
export type PlaylistFormData = {
  title: string
  url: string //REVIEW - maybe turn into a yt playlist url?
}
export const NewPlaylistForm = (props: NewPlaylistFormProps) => {
  const { showForm } = props
  let formClasses = 'new-playlist-form'
  if (showForm === true) formClasses += ' form--active'

  function handleFormSubmit(e: FormEvent): void {
    e.preventDefault()
    if (e.target instanceof HTMLFormElement) {
      const formData = Object.fromEntries(new FormData(e.target))
      props.onSubmit?.(formData as PlaylistFormData) //TODO - validate to only allow youtube playlist URL
    }
  }

  function handleFormClicks(e: React.MouseEvent): void {
    const target = e.target as HTMLElement
    if (target.className.match('form-cancel')) {
      props.onCancel?.()
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      onClick={handleFormClicks}
      className={formClasses}>
      <fieldset>
        <legend>New Playlist</legend>
        <input name="title" required type="text" placeholder="Title" />
        <input
          name="url"
          required
          type="url"
          placeholder="youtube playlist url"
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
