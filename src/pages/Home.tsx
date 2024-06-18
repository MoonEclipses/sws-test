import AsideMenu from '../features/aside/AsideMenu'
import Table from '../features/table/Table'
import TabSelector from '../features/tabs/TabSelector'
import './home.scss'

export default function Home() {
  return (
    <div className="home-page">
      <AsideMenu />
      <div className="content">
        <TabSelector />
        <Table />
      </div>
    </div>
  )
}
