import GridNode from './GridNode';
import Graph from './Graph';
import BinaryHeap from './BinaryHeap';

/**
 * @name pathTo
 * @description 到对应节点位置的路径
 * @param node 节点
 * @returns 路径数组
 */
function pathTo(node: GridNode): Array<GridNode> {
  let curr = node;
  const path = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  return path;
}

export interface AStarResult {
  path: Array<GridNode>;
  currentNodes: Map<number, GridNode>;
  neighborNodes: Map<number, Array<GridNode>>;
}

/**
 * @name Heuristics
 * @description 启发式算法 manhattan-曼哈顿距离，diagonal-对角距离
 */
export const Heuristics = {
  manhattan: function(pos0: GridNode, pos1: GridNode): number {
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  },
  diagonal: function(pos0: GridNode, pos1: GridNode): number {
    var D = 1;
    var D2 = Math.sqrt(2);
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
  }
}

/**
 * AStar算法
 */
export default class AStar {
  /**
   * @name cleanNode
   * @description 清理节点数据
   * @param node 节点
   * @returns {void}
   */
  public static cleanNode(node: GridNode): void {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }

  /**
   * @name search
   * @description 开始搜索最短路径
   * @param graph 图
   * @param start 起始节点
   * @param end 终点节点
   * @param options 配置
   */
  public static search (graph: Graph, start: GridNode, end: GridNode, options:any): AStarResult {
    graph.cleanDirty();
    options = options || {};
    // 启发算法，默认用曼哈顿距离作为启发算法
    const heuristic = options.heuristic || Heuristics.manhattan;
    // 如果目标节点不可达，是否返回最接近目标的节点
    const closest = options.closest || false;

    const openHeap = new BinaryHeap(function(node: GridNode) {
      return node.f;
    });
    // 将起始节点作为当前最近节点
    let closestNode = start;

    start.h = heuristic(start, end);
    graph.markDirty(start);

    openHeap.push(start);
    let iterNum = 0;
    const neighborNodes: Map<number, Array<GridNode>> = new Map();
    const currentNodes: Map<number, GridNode> = new Map();

    while (openHeap.size() > 0) {
      // 取对顶元素，也就是F最小的。堆帮我们排好序了
      let currentNode = openHeap.pop();

      // 如果当前节点是终点，则返回路径
      if (currentNode === end) {
        const result: AStarResult = {
          path: pathTo(currentNode),
          currentNodes,
          neighborNodes,
        };
        return result;
      }

      // 将当前节点放入关闭列表，这里用的是closed标志，然后处理其他相邻节点
      currentNode.closed = true;

      // 找到当前节点的所有相邻节点
      const neighbors = graph.neighbors(currentNode);

      for (var i = 0, il = neighbors.length; i < il; ++i) {
        const neighbor = neighbors[i];

        if (neighbor.closed || neighbor.isWall()) {
          // 如果这个相邻节点在关闭列表或者是墙，则跳过处理下一个
          continue;
        }

        // g为节点到起点的最短距离，相邻节点的g等于当前节点的g加上与相邻节点的距离
        // 我们需要校验到达相邻节点的路径是否是当前最短的路径
        const gScore = currentNode.g + neighbor.getCost(currentNode);
        const beenVisited = neighbor.visited;

        // 如果相邻节点未被访问到或者其新的g值小于旧的g值则重新计算
        if (!beenVisited || gScore < neighbor.g) {
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor, end);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
          if (closest) {
            // 如果相邻节点比当前最近节点还靠近终点，则将其置为当前最近节点
            if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
              closestNode = neighbor;
            }
          }

          if (!beenVisited) {
            // 将相邻节点入栈，栈会根据其f值将其放到正确的位置
            openHeap.push(neighbor);
          } else {
            // 因为之前访问过此相邻节点，则需要重新排序堆的位置
            openHeap.rescoreElement(neighbor);
          }
        }
      }
      neighborNodes[iterNum] = neighbors;
      currentNodes[iterNum] = currentNode;
      iterNum++;
    }

    if (closest) {
      const result: AStarResult = {
        path: pathTo(closestNode),
        currentNodes,
        neighborNodes,
      };
      return result;
    }

    // 找不到路径，返回空
    const result: AStarResult = {
      path: [],
      currentNodes,
      neighborNodes,
    };
    return result;
  }
}