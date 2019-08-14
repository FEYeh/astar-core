/** Declaration file generated by dts-gen */

export = astar_core;

declare interface IGridNode {
  /**
   * @name x
   * @description X坐标
   */
  public x: number;

  /**
   * @name y
   * @description Y坐标
   */
  public y: number;

  /**
   * @name x
   * @description 权重
   */
  public weight: number;

  /**
   * @name f
   * @description 综合优先级
   */
  public f: number;

  /**
   * @name n
   * @description 节点距离起点的代价
   */
  public g: number;

  /**
   * @name h
   * @description 节点距离终点的预计代价
   */
  public h: number;

  /**
   * @name visited
   * @description 节点是否被访问过
   */
  public visited: boolean;

  /**
   * @name closed
   * @description 节点是否在关闭列表
   */
  public closed: boolean;

  /**
   * @name parent
   * @description 路径上的父节点
   */
  public parent: IGridNode;

  /**
   * @name toString
   * @description 格式化字符串
   * @returns {string}
   */
  public toString(): string;

  /**
   * @name getCost
   * @description 获取权重
   * @param fromNeighbor 相邻节点
   * @returns {number}
   */
  public getCost(fromNeighbor: IGridNode): number;

  /**
   * @name isWall
   * @description 是否是墙
   * @returns {boolean}
   */
  public isWall(): boolean;
}

declare interface IGraph {
  /**
   * @name nodes
   * @description 节点集合
   */
  private nodes: Array<IGridNode>;

  /**
   * @name grid
   * @description 网格，二维的节点集合
   */
  private grid: Array<Array<IGridNode>>;

  /**
   * @name diagonal
   * @description 标识是否可以对角移动
   */
  private diagonal: boolean;

  /**
   * @name dirtyNodes
   * @description 脏节点集合
   */
  private dirtyNodes: Array<IGridNode>;

  /**
   * @name init
   * @description 初始化
   * @returns {void}
   */
  public init(): void;

  /**
   * @name cleanDirty
   * @description 清理脏节点集合
   * @returns {void}
   */
  public cleanDirty(): void;
  /**
   * @name markDirty
   * @description 加入脏节点集合
   * @param node 节点
   * @returns {void}
   */
  public markDirty(node: IGridNode): void;

  /**
   * @name neighbors
   * @description 获取某一节点的所有相邻节点
   * @param node 节点
   * @returns {Array<IGridNode>} 所有相邻节点
   */
  public neighbors(node: IGridNode): Array<IGridNode>;

  /**
   * @name toString
   * @description 格式化字符串
   */
  public toString(): string;
}

declare interface IAstar {
  public static cleanNode(node: IGridNode): void;
  public static search (graph: IGraph, start: IGridNode, end: IGridNode, options:any): Array<IGridNode>
}

declare const astar_core: {
  default: {
    AStar: IAstar;
    Graph: IGraph;
    GridNode: IGridNode;
    Heuristics: {
      diagonal: Function;
      manhattan: Function;
    };
  };
};
