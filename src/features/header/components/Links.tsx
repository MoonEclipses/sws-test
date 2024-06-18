/// <reference types="vite-plugin-svgr/client" />
import MenuIcon from '../../../assets/menu.svg?react'
import ArrowIcon from '../../../assets/arrow.svg?react'

export default function Links() {
  return (
    <div className="links">
      <a className="link" href="#">
        <MenuIcon />
      </a>
      <a className="link" href="#">
        <ArrowIcon />
      </a>
    </div>
  )
}
