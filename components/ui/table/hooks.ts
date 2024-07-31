import { useEffect, useState } from 'react'
export interface useChooseActionProp<T> {
  data: T[]
}
export function useChooseMulti<T>(props: useChooseActionProp<T>) {
  const [dataState, setDataState] = useState<T[]>(props.data)
  const [itemChoose, setItemChoose] = useState<T[]>([])
  const [chooseAllItem, setChooseAllItem] = useState(false)

  useEffect(() => {
    if (props.data !== dataState || !props.data) {
      setDataState(props.data)
      clearChooseItems()
    }
  }, [props.data])

  const toggleChooseItem = (item: T) => {
    let newData = [...itemChoose]
    let Item = itemChoose.find((val) => val === item)
    if (Item === undefined) {
      newData.push(item)
    } else {
      let index = newData.indexOf(Item)
      if (index !== -1) newData.splice(index, 1)
    }
    setItemChoose([...newData])
    setChooseAllItem(arraysEqualDeep(newData, dataState))
  }
  const toggleChooseAllItem = (checked: boolean) => {
    if (checked === false) {
      setItemChoose([] as T[])
      setChooseAllItem(false)
    } else {
      setChooseAllItem(true)
      setItemChoose([...dataState] as T[])
    }
  }
  const clearChooseItems = () => {
    setItemChoose([] as T[])
    setChooseAllItem(false)
  }
  const chooseAllItems = () => chooseAllItem

  return {
    toggleChooseAllItem,
    toggleChooseItem,
    setDataChoose: setDataState,
    chooseAllItems,
    clearChooseItems,
    itemChoose,
  }
}

function arraysEqualDeep<T>(arr1: T[], arr2: T[]): boolean {
  let sortedArr1 = arr1.map((obj) => JSON.stringify(obj)).sort()
  let sortedArr2 = arr2.map((obj) => JSON.stringify(obj)).sort()

  if (sortedArr1.length !== sortedArr2.length) {
    return false
  }
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false
    }
  }

  return true
}
