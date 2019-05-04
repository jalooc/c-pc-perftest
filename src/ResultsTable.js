import React from 'react'

import componentTypes from './componentTypes'

const ResultsTable = ({ results }) => {
  const rows = Object.entries(results).map(([maxDepth, result]) =>
    <tr key={maxDepth}>
      <th>{maxDepth}</th>
      {componentTypes.map(type => <td key={type}>{result[type] ? result[type].mean : '-'}</td>)}
    </tr>
  )

  if (!rows.length) return null

  return (
    <table>
      <thead>
      <tr>
        <th>Max tree depth</th>
        {componentTypes.map(type => <th key={type}>{type}</th>)}
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  )
}

export default ResultsTable