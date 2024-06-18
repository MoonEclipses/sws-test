import { PropsWithChildren } from 'react'

export default function Tab({ children }: PropsWithChildren) {
  return <div className="tab">{children}</div>
}
