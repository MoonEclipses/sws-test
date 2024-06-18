import PanelButton from './PanelButton'

export default function PanelButtons() {
  return (
    <div className="panel-buttons">
      <PanelButton text="Просмотр" isActive={true} />
      <PanelButton text="Управление" />
    </div>
  )
}
