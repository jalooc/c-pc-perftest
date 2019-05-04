import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import makeTestComponent from './makeTestComponent'

export default class TestSandbox extends PureComponent {
  static propTypes = {
    componentType: PropTypes.string.isRequired,
    maxDepth: PropTypes.number.isRequired,
    addMeasurement: PropTypes.func.isRequired,
  }

  state = {
    randomProp: Math.random(),
    testing: false,
  }

  TestComponent = makeTestComponent(this.props.componentType)

  componentDidMount() {
    this.mounted = true
  }

  componentWillUpdate() {
    this.start = performance.now()
  }

  componentDidUpdate(prevProps, prevState) {
    const shouldSaveMeasurement =
      prevProps.componentType === this.props.componentType &&
      prevProps.maxDepth === this.props.maxDepth &&
      prevProps.addMeasurement === this.props.addMeasurement

    if (shouldSaveMeasurement) {
      const updateTime = performance.now() - this.start

      this.props.addMeasurement({
        maxDepth: this.props.maxDepth,
        componentType: this.props.componentType,
        updateTime,
      })
    }

    if (this.state.testing) {
      requestAnimationFrame(() => {
        if (this.mounted) this.setState({ randomProp: Math.random() })
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  toggleTesting = () => this.setState(({ testing }) => ({ testing: !testing }))

  render() {
    const TestComponent = this.TestComponent

    return (
      <>
        <button onClick={this.toggleTesting}>
          {this.state.testing ? 'Testing...' : 'Test it'}
        </button>
        <TestComponent maxDepth={this.props.maxDepth} randomProp={this.state.randomProp} />
      </>
    )
  }
}