import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue))

  useEffect(() => {
    saveValue(key, value)
  }, [key, value])

  return [value, setValue]
}

function getSavedValue<T>(key: string, initialValue: T) {
  const savedValue = localStorage.getItem(key)
  if (savedValue) {
    const parsedValue = JSON.parse(savedValue) as T
    if (
      parsedValue instanceof Object &&
      Object.keys(parsedValue).length === 0
    ) {
      return initialValue
    }
    return parsedValue
  }
  return initialValue
}

function saveValue(key: string, value: unknown) {
  if (isEmpty(value)) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

function isEmpty(value: unknown) {
  if (value === null || value === undefined) {
    return true
  } else if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0
  } else {
    return false
  }
}
