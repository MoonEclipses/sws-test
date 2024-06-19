import { RowState, Work, WorkDTOEdit } from '../Table'
import InteractiveButtons from './InteractiveButtons'
import { SubmitHandler, useForm } from 'react-hook-form'
import CellInput from './CellInput'
import useRow from '../hooks/useRow'
type RowProps = {
  work: Work
  handleAdd: (workDTO: WorkDTOEdit, parentId: Work['parentId'], tempId: Work['id']) => void
  handleAddCreating: (parentId: Work['parentId']) => void
  handleDelete: (id: Work['id'], parentId: Work['parentId']) => void
  handleUpdate: (workDTO: WorkDTOEdit, parentId: Work['parentId'], id: Work['id']) => void
}

export default function Row({ work, handleAdd, handleDelete, handleUpdate, handleAddCreating }: RowProps) {
  const { isEditing, workDTO, workDTONames, rowState, setRowState } = useRow(work)
  const { register, handleSubmit } = useForm<WorkDTOEdit>()
  const onSubmit: SubmitHandler<WorkDTOEdit> = (data) => {
    setRowState(RowState.SHOW)
    if (rowState === RowState.CREATE) {
      handleAdd(data, work.parentId, work.id)
    } else if (rowState === RowState.UPDATE) {
      handleUpdate(data, work.parentId, work.id)
    }
  }

  return (
    <tr className="works-table-row">
      <td className="works-table-cell">
        <InteractiveButtons
          level={work.level}
          isEditing={isEditing}
          totalChildren={work.totalChildren}
          handleCreateRow={() => handleAddCreating(work.id)}
          handleUpdateRow={() => setRowState(RowState.UPDATE)}
          handleDeleteRow={() => handleDelete(work.id, work.parentId)}
        />
      </td>
      {workDTONames.map((name) =>
        isEditing ? (
          <td className="works-table-cell-input" key={name}>
            <CellInput
              value={workDTO[name]}
              handleEnter={handleSubmit(onSubmit)}
              register={register(name, { required: true, minLength: 1 })}
              type={name === 'rowName' ? 'text' : 'number'}
            />
          </td>
        ) : (
          <td className="works-table-cell" key={name}>
            {work[name]}
          </td>
        ),
      )}
    </tr>
  )
}
