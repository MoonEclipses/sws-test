import { UseFormRegisterReturn } from 'react-hook-form'

type CellInputProps = {
  text?: string
  handleEnter: () => void
  register: UseFormRegisterReturn
}

export default function CellInput({ text = '', handleEnter, register }: CellInputProps) {
  return (
    <input
      type="text"
      defaultValue={text}
      {...register}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleEnter()
        }
      }}
    />
  )
}
