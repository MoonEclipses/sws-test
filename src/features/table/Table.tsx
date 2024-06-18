import { Fragment } from 'react/jsx-runtime'
import useTableData from './hooks/useTableData'
import Row from './components/Row'
import './table.scss'

export enum RowState {
  SHOW = 'show',
  UPDATE = 'update',
  CREATE = 'create',
}
export const editingState = [RowState.UPDATE, RowState.CREATE]

export type Work = {
  id: number
  level: number
  parentId: number | null
  rowName: string
  salary: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
}

export type WorkDTOEdit = Pick<Work, 'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'>
export type WorkDTOGet = Work & { child: WorkDTOGet[] }

export default function Table() {
  const { works } = useTableData()
  return (
    <div className="table-wrapper">
      <table className="works-table">
        <tbody className="works-table-body">
          <tr className="works-table-row">
            <th className="works-table-header small-coll">Уровень</th>
            <th className="works-table-header large-coll">Наименование работ</th>
            <th className="works-table-header medium-coll">Основная з/п</th>
            <th className="works-table-header medium-coll">Оборудование</th>
            <th className="works-table-header medium-coll">Накладные расходы</th>
            <th className="works-table-header medium-coll">Сметная прибыль</th>
          </tr>
          {works.map((work) => (
            <Fragment key={work.id}>
              <Row
                work={work}
                handleAdd={function (workDTO: WorkDTOEdit): void {
                  console.log(workDTO)
                }}
                handleDelete={function (id: number): void {
                  console.log(id)
                }}
                handleUpdate={function (id: number, workDTO: WorkDTOEdit): void {
                  console.log(id)
                }}
              />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
