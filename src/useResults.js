import { useReducer } from 'react'

const resultsReducer = (state, action) => {
  const { componentType, maxDepth, updateTime } = action
  const existingMaxDepth = state[maxDepth] || {}
  const existingComponentType = existingMaxDepth[componentType] || {}
  const existingTestsCount = existingComponentType.testsCount || 0
  const existingMean = existingComponentType.mean || 0

  return {
    ...state,
    [maxDepth]: {
      ...existingMaxDepth,
      [componentType]: {
        ...existingComponentType,
        testsCount: existingTestsCount + 1,
        mean: (existingMean * existingTestsCount + updateTime) / (existingTestsCount + 1),
      }
    }
  }
}

const useResults = () => {
  const [results, addMeasurement] = useReducer(resultsReducer, {})

  return { results, addMeasurement }
}

export default useResults