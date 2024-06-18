import clsx from 'clsx'

type PanelButtonProps = {
  text: string
  isActive?: boolean
}

export default function PanelButton({ text, isActive }: PanelButtonProps) {
  return <button className={clsx('panel-button', isActive && 'panel-button-active')}>{text}</button>
}
