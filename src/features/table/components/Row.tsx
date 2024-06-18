import { RowState, Work, WorkDTO } from '../Table'
import InteractiveButtons from './InteractiveButtons'
import { SubmitHandler, useForm } from 'react-hook-form'
import CellInput from './CellInput'
import useRow from '../hooks/useRow'
type RowProps = {
  work: Work
  handleAdd: (workDTO: WorkDTO) => void
  handleDelete: (id: number) => void
  handleUpdate: (id: number, workDTO: WorkDTO) => void
}
export const editingState = [RowState.UPDATE, RowState.CREATE]

export default function Row({ work }: RowProps) {
  const { isEditing, workDTO, workDTONames, rowState } = useRow(work)
  const { register, handleSubmit } = useForm<WorkDTO>()
  const onSubmit: SubmitHandler<WorkDTO> = (data) => console.log(data)

  return (
    <tr className="works-table-row">
      <td className="works-table-cell">
        <InteractiveButtons />
      </td>
      <td className="works-table-cell">
        {isEditing ? work.rowName : <CellInput handleEnter={handleSubmit(onSubmit)} register={register('rowName')} />}
      </td>
      {workDTONames.map((name) => (
        <td className="works-table-cell" key={name}>
          {isEditing ? (
            <CellInput
              text={rowState === RowState.UPDATE ? workDTO[name].toString() : ''}
              handleEnter={handleSubmit(onSubmit)}
              register={register(name)}
            />
          ) : (
            work[name]
          )}
        </td>
      ))}
    </tr>
  )
}
