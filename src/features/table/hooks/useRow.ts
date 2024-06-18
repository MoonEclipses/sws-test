import { useEffect, useMemo, useState } from 'react'
import { RowState, Work, WorkDTOEdit, editingState } from '../Table'

const workIsCreating = (work: Work) => {
  return (
    work.rowName === '' &&
    work.salary === 0 &&
    work.equipmentCosts === 0 &&
    work.overheads === 0 &&
    work.estimatedProfit === 0
  )
}

const useRow = (work: Work) => {
  const [rowState, setRowState] = useState<RowState>(workIsCreating(work) ? RowState.CREATE : RowState.SHOW)
  useEffect(() => {
    setRowState(workIsCreating(work) ? RowState.CREATE : RowState.SHOW)
  }, [work])
  const workDTO = useMemo<WorkDTOEdit>(
    () => ({
      rowName: work.rowName,
      salary: work.salary,
      equipmentCosts: work.equipmentCosts,
      overheads: work.overheads,
      estimatedProfit: work.estimatedProfit,
    }),
    [work],
  )
  const workDTONames = Object.keys(workDTO) as Array<keyof WorkDTOEdit>
  const isEditing = editingState.includes(rowState)
  return { rowState, isEditing, workDTO, workDTONames }
}

export default useRow
