import React, { useState } from 'react';

import componentTypes from './componentTypes'
import useResults from './useResults'
import ResultsTable from './ResultsTable'
import TestSandbox from './TestSandbox'

const HIGH_DEPTH = 8

const App = () => {
  const [maxDepth, setMaxDepth] = useState(4)
  const [componentType, setComponentType] = useState(componentTypes[0])
  const { results, addMeasurement } = useResults()

  return (
    <>
      <small><i><a href="https://github.com/jalooc/c-pc-perftest">Source code</a></i></small>
      <fieldset>
        <label>
          Max tree depth
          <input type="number" value={maxDepth} onChange={e => setMaxDepth(+e.target.value)} />
          {maxDepth > HIGH_DEPTH ? '☠' : null}
        </label>
      </fieldset>

      <fieldset>
        {componentTypes.map(type => (
          <ComponentTypeRadio
            key={type}
            type={type}
            checked={type === componentType}
            onChange={e => setComponentType(e.target.value)}
          />
        ))}
      </fieldset>

      <ResultsTable results={results} />

      <TestSandbox
        key={componentType + maxDepth}
        componentType={componentType}
        maxDepth={maxDepth}
        addMeasurement={addMeasurement}
      />
    </>
  );
}

export default App;

const ComponentTypeRadio = ({ type, ...props }) =>
  <label><input type="radio" name="component" value={type} {...props} /> {type}</label>