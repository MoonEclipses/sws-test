import { useEffect, useMemo, useState } from 'react'
import { RowState, Work, WorkDTO } from '../Table'
import { editingState } from '../components/Row'

const useRow = (work: Work) => {
  const [rowState, setRowState] = useState<RowState>(work.rowState || RowState.SHOW)
  useEffect(() => {
    setRowState(work.rowState || RowState.SHOW)
  }, [work])
  const workDTO = useMemo<WorkDTO>(
    () => ({
      rowName: work.rowName,
      salary: work.salary,
      equipmentCosts: work.equipmentCosts,
      overheads: work.overheads,
      estimatedProfit: work.estimatedProfit,
    }),
    [work],
  )
  const workDTONames = Object.keys(workDTO) as Array<keyof WorkDTO>
  const isEditing = editingState.includes(rowState)
  return { rowState, isEditing, workDTO, workDTONames }
}

export default useRow
