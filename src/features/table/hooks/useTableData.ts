import { useEffect, useState } from 'react'
import { Work, WorkDTO } from '../Table'

const useTableData = () => {
  const [works, setWorks] = useState<Array<Work>>([])
  const getWorks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/list`)
    const workList = await response.json()
    return workList
  }
  useEffect(() => {
    const setInitialWorks = async () => {
      const workList = await getWorks()
      setWorks(workList)
    }
    setInitialWorks()
  }, [])
  const removeWork = async (id: number) => {
    const newWorks = works.filter((work) => work.id !== id)
    setWorks(newWorks)
    await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/${id}/delete`, {
      method: 'DELETE',
    })
  }
  const addWork = async (workDTO: WorkDTO, parentId: Work['parentId']) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...workDTO, parentId }),
    })
    const newWork = (await response.json())['current']
  }
  return { works, removeWork, addWork }
}

export default useTableData
