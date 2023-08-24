import { useRef } from 'react'
import css from './MenuButton.module.css'

export type MenuButton = {
  isMenuOpen: boolean
}

type MenuButtonProps = {
  onClick?: (menuButton: MenuButton) => void
}

export const MenuButton = (props: MenuButtonProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null)

  function handleClick(e: React.MouseEvent) {
    const isMenuOpen = !!checkboxRef.current?.checked
    e.currentTarget.classList.toggle(css['open'], isMenuOpen)
    props.onClick?.({ isMenuOpen })
  }

  return (
    <label onClick={handleClick} className={css['menu-btn']}>
      <input ref={checkboxRef} type="checkbox" />
    </label>
  )
}

{
  /* <button className="menu-btn" onClick={handleMenuBtnClick}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1.5em"
    width="1.5em"
    fill="currentcolor"
    viewBox="0 0 448 512">
    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
  </svg>
</button> */
}
