/**
 * @name GridNode
 * @description 网格节点
 */
export default class GridNode {
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
  public f: number = 0;

  /**
   * @name n
   * @description 节点距离起点的代价
   */
  public g: number = 0;

  /**
   * @name h
   * @description 节点距离终点的预计代价
   */
  public h: number = 0;

  /**
   * @name visited
   * @description 节点是否被访问过
   */
  public visited: boolean = false;

  /**
   * @name closed
   * @description 节点是否在关闭列表
   */
  public closed: boolean = false;

  /**
   * @name parent
   * @description 路径上的父节点
   */
  public parent: GridNode = null;

  constructor(x: number, y: number, weight: number) {
    this.x = x;
    this.y = y;
    this.weight = weight;
  }
  
  /**
   * @name toString
   * @description 格式化字符串
   * @returns {string}
   */
  public toString(): string {
    return '[' + this.x + ' ' + this.y + ']';
  }

  /**
   * @name getCost
   * @description 获取权重
   * @param fromNeighbor 相邻节点
   * @returns {number}
   */
  public getCost(fromNeighbor: GridNode): number {
    // 计算对角权重
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
      return this.weight * 1.41421;
    }
    return this.weight;
  }

  /**
   * @name isWall
   * @description 是否是墙
   * @returns {boolean}
   */
  public isWall(): boolean {
    return this.weight === 0;
  }
}