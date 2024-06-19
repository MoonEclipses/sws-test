import { useCallback } from 'react'
import RowIcon from '../../../assets/row-level.svg?react'
import TrashIcon from '../../../assets/trash.svg?react'
import { Work } from '../Table'
import debounce from 'lodash/debounce'
import VerticalLine from '../../aside/components/VerticalLine'
import HorizontalLine from '../../aside/components/HorizontalLine'

type InteractiveButtonsProps = {
  level: Work['level']
  totalChildren: Work['totalChildren']
  isEditing: boolean
  handleCreateRow: () => void
  handleUpdateRow: () => void
  handleDeleteRow: () => void
}

export default function InteractiveButtons({
  level,
  totalChildren,
  isEditing,
  handleCreateRow,
  handleUpdateRow,
  handleDeleteRow,
}: InteractiveButtonsProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.detail) {
      case 1:
        handleCreateRow()
        break
      default:
        handleUpdateRow()
        break
    }
  }
  const debouncedClick = useCallback(debounce(handleClick, 200), [])
  return (
    <div className="button-wrapper" style={{ marginLeft: level * 20 }}>
      <button className="interactive-button" disabled={isEditing} onClick={debouncedClick}>
        <RowIcon />
        {!!totalChildren && <VerticalLine length={49 * totalChildren + 11 * (totalChildren - 1)} top={24} left={10} />}
        {level > 0 && <HorizontalLine length={8} top={11} left={-8} />}
      </button>
      <button className="interactive-button hidden-unhover" disabled={isEditing} onClick={handleDeleteRow}>
        <TrashIcon />
      </button>
    </div>
  )
}
