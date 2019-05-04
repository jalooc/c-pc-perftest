This project's goal is to compare updating performance of React's Component and PureComponent.

[The app](https://jalooc.github.io/c-pc-perftest/) generates random tree of elements with maximum depth set by a user.

The _dynamic_ nature of a React app is simulated by the following rules:
* Every element has between 1 and `MAX_CHILDREN_NUMBER` children (except of the elements at maximum depth).
* The number of children can change between rerenders.
* Every element has a state that simulates a change in a prop: `shouldChangeChildProp`, which changes randomly, with the probability of being changed in inverse proportion to the depth it is located in the tree. Also, once one element doesn't change this prop, neither do its children. This is to simulate _natural_ prop change flow in contrast to just randomly pop prop changes throughout all the tree. 