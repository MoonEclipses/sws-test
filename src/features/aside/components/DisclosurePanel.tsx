import clsx from 'clsx'
import CategoryIcon from '../../../assets/category.svg?react'

type Category = {
  name: string
  isActive?: boolean
}

const fakeCategories: Array<Category> = [
  { name: 'По проекту' },
  { name: 'Объекты' },
  { name: 'СМР', isActive: true },
  { name: 'РД' },
  { name: 'МТО' },
]

export default function DisclosurePanel() {
  return (
    <div className="disclosure-panel">
      {fakeCategories.map(({ name, isActive }, index) => (
        <div className={clsx('category', isActive && 'category-active')} key={index}>
          <CategoryIcon />
          {name}
        </div>
      ))}
    </div>
  )
}
