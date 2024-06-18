import { useEffect, useState } from 'react'
import { Work, WorkDTOEdit, WorkDTOGet } from '../Table'

const useTableData = () => {
  const [works, setWorks] = useState<Array<Work>>([])
  const getWorks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/list`)
    const workList = (await response.json()) as WorkDTOGet[]
    return workList
  }

  useEffect(() => {
    const worksToList = (nestedWorkList: WorkDTOGet[], level: number) => {
      const workList: Work[] = []
      nestedWorkList.forEach((work) => {
        workList.push({
          ...work,
          level,
        })
        if (work.child) {
          workList.push(...worksToList(work.child, level + 1))
        }
      })
      return workList
    }
    const setInitialWorks = async () => {
      const nestedWorkList = await getWorks()
      setWorks(worksToList(nestedWorkList, 0))
    }
    setInitialWorks()
  }, [])

  const removeWork = async (id: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/${id}/delete`, {
      method: 'DELETE',
    })
    const newWorks = works.filter((work) => work.id !== id)
    setWorks(newWorks)
  }

  const addWork = async (workDTO: WorkDTOEdit, parentId: Work['parentId'], tempId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...workDTO,
        parentId,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      }),
    })

    const newWork = { ...(await response.json())['current'], parentId } as Work
    setWorks((prevWorks) => {
      const newWorks = [...prevWorks]
      const index = newWorks.findIndex((work) => work.id === tempId)
      newWorks[index] = newWork
      return newWorks
    })
  }

  const addCreatingWork = (parentId: Work['parentId']) => {
    setWorks((prevWorks) => {
      const newWorks = [...prevWorks]
      const index = newWorks.reverse().findIndex((work) => work.parentId === parentId)
      newWorks.splice(index + 1, 0, {
        id: new Date().valueOf(),
        level: newWorks[index].level,
        parentId,
        rowName: '',
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
      })
      return newWorks
    })
  }

  const updateWork = async (id: number, workDTO: WorkDTOEdit) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/${id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workDTO),
    })
    const newWork = { ...(await response.json())['current'] } as Work
    setWorks((prevWorks) => {
      const newWorks = [...prevWorks]
    }
  }

  return { works, removeWork, addWork, addCreatingWork, }
}

export default useTableData
