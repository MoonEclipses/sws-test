import { UseFormRegisterReturn } from 'react-hook-form'

type CellInputProps = {
  value?: string | number
  handleEnter: () => void
  register: UseFormRegisterReturn
  type: string
}

export default function CellInput({ value = '', handleEnter, register, type }: CellInputProps) {
  return (
    <input
      className="cell-input"
      type={type}
      defaultValue={value}
      {...register}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleEnter()
        }
      }}
    />
  )
}
