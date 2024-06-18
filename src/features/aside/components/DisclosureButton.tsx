import DisclosureButtonIcon from '../../../assets/down-arrow.svg?react'

export default function DisclosureButton() {
  return (
    <button className="disclosure-button">
      <div>
        <span className="name">Название проекта</span>
        <span className="abbreviation">Абривиатура</span>
      </div>
      <DisclosureButtonIcon />
    </button>
  )
}
