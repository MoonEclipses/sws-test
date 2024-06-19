import { useEffect, useState } from 'react'
import { Work, WorkDTOEdit, WorkDTOGet } from '../Table'
import findLastIndex from 'lodash/findLastIndex'
import { find } from 'lodash'

const fallbackWorks = [
  {
    id: 86601,
    rowName: 'Работа 1',
    total: 1,
    salary: 40000,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 24000,
    overheads: 8000,
    estimatedProfit: 80000,
    child: [
      {
        id: 86838,
        rowName: 'Работа 2',
        total: 0,
        salary: 20000,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 12000,
        overheads: 4000,
        estimatedProfit: 40000,
        child: [],
      },
    ],
  },
  {
    id: 86839,
    rowName: 'Работа 3',
    total: 0,
    salary: 20000,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 12000,
    overheads: 4000,
    estimatedProfit: 40000,
    child: [],
  },
  {
    id: 86840,
    rowName: 'Работа 4',
    total: 2,
    salary: 60000,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 36000,
    overheads: 12000,
    estimatedProfit: 120000,
    child: [
      {
        id: 86841,
        rowName: 'Работа 5',
        total: 0,
        salary: 20000,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 12000,
        overheads: 4000,
        estimatedProfit: 40000,
        child: [],
      },
      {
        id: 86856,
        rowName: 'Работа 6',
        total: 0,
        salary: 20000,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 12000,
        overheads: 4000,
        estimatedProfit: 40000,
        child: [],
      },
    ],
  },
]

const prepWork = (
  workDTO: WorkDTOEdit | WorkDTOGet,
  id: Work['id'],
  level: Work['level'],
  parentId: Work['parentId'],
  totalChildren: Work['totalChildren'],
): Work => {
  return {
    id,
    level,
    parentId,
    rowName: workDTO.rowName,
    salary: workDTO.salary,
    equipmentCosts: workDTO.equipmentCosts,
    overheads: workDTO.overheads,
    estimatedProfit: workDTO.estimatedProfit,
    totalChildren,
  }
}

const useTableData = () => {
  const [works, setWorks] = useState<Array<Work>>([])
  const getWorks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/list`)
      const workList = (await response.json()) as WorkDTOGet[]
      return workList
    } catch {
      return fallbackWorks
    }
  }

  useEffect(() => {
    const worksToList = (nestedWorkList: WorkDTOGet[], level: Work['level'], parentId: Work['parentId']) => {
      const workList: Work[] = []
      nestedWorkList.forEach((work) => {
        workList.push(prepWork(work, work.id, level, parentId, work.total))
        if (work.child) {
          workList.push(...worksToList(work.child, level + 1, work.id))
        }
      })
      return workList
    }
    const setInitialWorks = async () => {
      const nestedWorkList = await getWorks()
      if (!nestedWorkList.length) {
        setWorks([])
        addCreatingWork(null)
      } else setWorks(worksToList(nestedWorkList, 0, null))
    }
    setInitialWorks()
  }, [])

  const removeWork = async (id: Work['id'], parentId: Work['parentId']) => {
    const newWorks = works.filter((work) => work.id !== id)
    const parentWork = find(newWorks, (work) => work.id === parentId)
    parentWork && (parentWork.totalChildren -= 1)
    setWorks(newWorks)
    await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/${id}/delete`, {
      method: 'DELETE',
    })
  }

  const addWork = async (workDTO: WorkDTOEdit, parentId: Work['parentId'], id: Work['id']) => {
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

    const newWork = { ...(await response.json())['current'], parentId } as WorkDTOGet
    setWorks((prevWorks) => {
      const newWorks = [...prevWorks]
      const index = newWorks.findIndex((work) => work.id === id)
      const parentWork = find(newWorks, (work) => work.id === parentId)
      parentWork && (parentWork.totalChildren += 1)
      newWorks.splice(index, 1, {
        ...newWork,
        level: newWorks[index].level,
        parentId: newWorks[index].parentId,
        totalChildren: 0,
      })
      return newWorks
    })
  }

  const addCreatingWork = (parentId: Work['parentId']) => {
    setWorks((prevWorks) => {
      const newWorks = [...prevWorks]
      if (parentId !== null) {
        const index = findLastIndex(newWorks, (work) => work.parentId === parentId)
        let finalIndex = index
        let level = 0
        if (finalIndex >= 0) {
          level = newWorks[finalIndex].level
        } else {
          finalIndex = newWorks.findIndex((work) => work.id === parentId)
          level = newWorks[finalIndex].level + 1
        }
        newWorks.splice(finalIndex + 1, 0, {
          id: new Date().valueOf(),
          level,
          parentId,
          rowName: '',
          salary: 0,
          equipmentCosts: 0,
          overheads: 0,
          estimatedProfit: 0,
          totalChildren: 0,
        })
      } else {
        newWorks.push({
          id: new Date().valueOf(),
          level: 0,
          parentId,
          rowName: '',
          salary: 0,
          equipmentCosts: 0,
          overheads: 0,
          estimatedProfit: 0,
          totalChildren: 0,
        })
      }
      return newWorks
    })
  }

  const updateWork = async (workDTO: WorkDTOEdit, parentId: Work['parentId'], id: Work['id']) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_ENTITY_ID}/row/${id}/update`, {
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
    const newWork = { ...(await response.json())['current'] } as WorkDTOEdit
    setWorks((prevWorks) => {
      const newWorks = [...prevWorks]
      const index = newWorks.findIndex((work) => work.id === id)
      newWorks[index] = {
        ...newWorks[index],
        rowName: newWork.rowName,
        salary: newWork.salary,
        equipmentCosts: newWork.equipmentCosts,
        overheads: newWork.overheads,
        estimatedProfit: newWork.estimatedProfit,
      }
      return newWorks
    })
  }

  return { works, removeWork, addWork, addCreatingWork, updateWork }
}

export default useTableData
