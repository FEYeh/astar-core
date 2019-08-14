import GridNode from './GridNode';
import AStar from './AStar';

/**
 * @name Graph
 * @description 地图
 */
export default class Graph {
  /**
   * @name nodes
   * @description 节点集合
   */
  private nodes: Array<GridNode>;

  /**
   * @name grid
   * @description 网格，二维的节点集合
   */
  private grid: Array<Array<GridNode>>;

  /**
   * @name diagonal
   * @description 标识是否可以对角移动
   */
  private diagonal: boolean;

  /**
   * @name dirtyNodes
   * @description 脏节点集合
   */
  private dirtyNodes: Array<GridNode>;

  constructor(gridIn: Array<Array<number>>, options: any) {
    options = options || {};
    this.nodes = [];
    this.diagonal = !!options.diagonal;
    this.grid = [];
    for (let x = 0; x < gridIn.length; x++) {
      this.grid[x] = [];
      for (let y = 0, row = gridIn[x]; y < row.length; y++) {
        const node = new GridNode(x, y, row[y]);
        this.grid[x][y] = node;
        this.nodes.push(node);
      }
    }
    this.init();
  }

  /**
   * @name init
   * @description 初始化
   * @returns {void}
   */
  public init(): void {
    this.dirtyNodes = [];
    for (let i = 0; i < this.nodes.length; i++) {
      AStar.cleanNode(this.nodes[i]);
    }
  }

  /**
   * @name cleanDirty
   * @description 清理脏节点集合
   * @returns {void}
   */
  public cleanDirty(): void {
    for (let i = 0; i < this.dirtyNodes.length; i++) {
      AStar.cleanNode(this.dirtyNodes[i]);
    }
    this.dirtyNodes = [];
  }

  /**
   * @name markDirty
   * @description 加入脏节点集合
   * @param node 节点
   * @returns {void}
   */
  public markDirty(node: GridNode): void {
    this.dirtyNodes.push(node);
  }

  /**
   * @name neighbors
   * @description 获取某一节点的所有相邻节点
   * @param node 节点
   * @returns {Array<GridNode>} 所有相邻节点
   */
  public neighbors(node: GridNode): Array<GridNode> {
    const ret = [];
    const x = node.x;
    const y = node.y;
    const grid = this.grid;

    // 左
    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }

    // 右
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }

    // 下
    if (grid[x] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }

    // 上
    if (grid[x] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }

    // 如果允许对角移动，则将相邻四个对角的节点也加进来
    if (this.diagonal) {
      // 左下
      if (grid[x - 1] && grid[x - 1][y - 1]) {
        ret.push(grid[x - 1][y - 1]);
      }

      // 右下
      if (grid[x + 1] && grid[x + 1][y - 1]) {
        ret.push(grid[x + 1][y - 1]);
      }

      // 左上
      if (grid[x - 1] && grid[x - 1][y + 1]) {
        ret.push(grid[x - 1][y + 1]);
      }

      // 右上
      if (grid[x + 1] && grid[x + 1][y + 1]) {
        ret.push(grid[x + 1][y + 1]);
      }
    }

    return ret;
  }

  /**
   * @name toString
   * @description 格式化字符串
   */
  public toString(): string {
    const graphString = [];
    const nodes = this.grid;
    for (let x = 0; x < nodes.length; x++) {
      const rowDebug = [];
      const row = nodes[x];
      for (let y = 0; y < row.length; y++) {
        rowDebug.push(row[y].weight);
      }
      graphString.push(rowDebug.join(' '));
    }
    return graphString.join('\n');
  }
}
