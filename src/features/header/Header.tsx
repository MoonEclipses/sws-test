import Links from './components/Links'
import PanelButtons from './components/PanelButtons'
import './header.scss'

export default function Header() {
  return (
    <header className="header">
      <nav className="navigation">
        <Links />
        <PanelButtons />
      </nav>
    </header>
  )
}
