import React from 'react'
import PropTypes from 'prop-types'

const MAX_CHILDREN_NUMBER = 4

export default componentType => class TestComponent extends React[componentType] {
  static propTypes = {
    depthLevel: PropTypes.number,
    maxDepth: PropTypes.number.isRequired,
    shouldChangeChildProp: PropTypes.bool, // If a component doesn't change its props, neither will its children do it
  }

  static defaultProps = {
    depthLevel: 0,
    shouldChangeChildProp: true,
  }

  render() {
    const { depthLevel, maxDepth, shouldChangeChildProp } = this.props
    const childrenNumber = Math.floor(Math.random() * MAX_CHILDREN_NUMBER + 1)
    const children = depthLevel < maxDepth ?
      [...Array(childrenNumber)].map((_, i) => (
        <TestComponent
          key={i}
          depthLevel={depthLevel + 1}
          maxDepth={maxDepth}
          shouldChangeChildProp={shouldChangeChildProp && drawLots(maxDepth)} // The deeper in the tree, the higher the chance of having a change in a prop
          arbitraryProp1="abc" // This is to add some average work to PureComponent's shallow compare
          arbitraryProp2="abc"
          arbitraryProp3="abc"
        />
      )) :
      null

    return (
      <div style={{ marginLeft: 5 }}>
        {componentType} of level {depthLevel}
        {shouldChangeChildProp ?
          ' which may change childrens\' prop' :
          ' which won\'t change childrens\' prop'}
        {children}
      </div>
    )
  }
}

const drawLots = (magicSauce = 2) => Math.random() > 1 / magicSauce