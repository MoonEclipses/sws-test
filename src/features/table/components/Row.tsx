import { RowState, Work, WorkDTOEdit } from '../Table'
import InteractiveButtons from './InteractiveButtons'
import { SubmitHandler, useForm } from 'react-hook-form'
import CellInput from './CellInput'
import useRow from '../hooks/useRow'
type RowProps = {
  work: Work
  handleAdd: (workDTO: WorkDTOEdit) => void
  handleDelete: (id: number) => void
  handleUpdate: (id: number, workDTO: WorkDTOEdit) => void
}

export default function Row({ work }: RowProps) {
  const { isEditing, workDTO, workDTONames, rowState } = useRow(work)
  const { register, handleSubmit } = useForm<WorkDTOEdit>()
  const onSubmit: SubmitHandler<WorkDTOEdit> = (data) => console.log(data)

  return (
    <tr className="works-table-row">
      <td className="works-table-cell">
        <InteractiveButtons />
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
