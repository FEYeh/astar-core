# astar-core

#### Description
A-Star algorithm


#### Installation

```sh
npm install astar-core --save

or

yarn add astar-core
```

### Usage

```js
import AStarCore from "astar-core";

const { AStar, Graph } = AStarCore;

// map size equals 【gridSize x gridSize】
const gridSize = 10;

// decide how many walls in map
const wallFrequency = 0.1;

// wall flag
const WALL = 0;

// road flag
const ROAD = 1;

// 2 D arrays to store all nodes
const nodes = [];

// generate all nodes in map
for (let x = 0; x < gridSize; x++) {
  const nodeRow = [];
  for (let y = 0; y < gridSize; y++) {
    const isWall = Math.floor(Math.random() * (1 / wallFrequency));
    if (isWall === WALL) {
      nodeRow.push(WALL);
    } else {
      nodeRow.push(ROAD);
    }
  }
  nodes.push(nodeRow);
}

// start node
const start = nodes[0][0];

// end node
const end = nodes[gridSize - 1][gridSize - 1];
// graph options
// diagonal: specifies whether diagonal moves are allowed.
const graphOptions = { diagonal: false };

// create a map data
const graph = new Graph(nodes, graphOptions);

// a-star options
// closest: specifies whether to return the path to the closest node if the target is unreachable.
// heuristic: Heuristic function (see AStarCore.Heuristics).
const astarOptions = { closest: false, heuristic: null }; 

// use a-star algorithm to search the shortest path.
// it will return the path from start to end.
const path = AStar.search(graph, start, end, astarOptions);
```