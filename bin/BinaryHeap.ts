import GridNode from './GridNode';

export default class BinaryHeap {
  /**
   * @name items
   * @description 数组
   */
  public items: Array<GridNode>;

  /**
   * @name scoreFunction
   * @description 得分函数
   */
  private scoreFunction: Function;

  /**
   * @description 构造函数
   * @param scoreFunction 得分函数
   */
  constructor(scoreFunction: Function) {
    this.items = [];
    this.scoreFunction = scoreFunction;
  }

  public push(node: GridNode): void {
    // 将新元素添加到数组尾部
    this.items.push(node);

    // 允许它下沉.
    this.sinkDown(this.items.length - 1);
  }

  public pop(): GridNode {
    // 第一个元素
    const first = this.items[0];

    // 获取数组尾部的元素
    const end = this.items.pop();

    // 如果数组中还有元素，将尾部元素放到起始位置，让其冒泡
    if (this.items.length > 0) {
      this.items[0] = end;
      this.bubbleUp(0);
    }
    return first;
  }

  public remove(node: GridNode): void {
    const i = this.items.indexOf(node);

    // 找到后重复填充
    const end = this.items.pop();

    if (i !== this.items.length - 1) {
      this.items[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  }

  public size(): number {
    return this.items.length;
  }

  public rescoreElement(node: GridNode): void {
    this.sinkDown(this.items.indexOf(node));
  }

  public sinkDown(n: number): void {
    // 获取被下沉的元素
    const element = this.items[n];

    // 如果n为0，元素不能再被下沉
    while (n > 0) {
      // 计算父节点的位置并获取
      const parentN = ((n + 1) >> 1) - 1;
      const parent = this.items[parentN];
      // 如果父节点得分更高，则交换元素位置
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.items[parentN] = element;
        this.items[n] = parent;
        // 更新n，继续下一次新的位置
        n = parentN;
      } else {
        // 父节点无需再下沉
        break;
      }
    }
  }

  public bubbleUp(n: number): void {
    // 查找目标元素及其得分
    const length = this.items.length;
    const element = this.items[n];
    const elemScore = this.scoreFunction(element);

    while (true) {
      // 计算子节点位置
      const child2N = (n + 1) << 1;
      const child1N = child2N - 1;
      // 这用于存储元素的新位置

      let swap = null;
      let child1Score: number = 0;
      // 如果第一个子元素存在
      if (child1N < length) {
        // 获取并计算其得分
        const child1 = this.items[child1N];
        child1Score = this.scoreFunction(child1);

        // 如果得分小于当前元素，则需要交换第一个子节点
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // 对第二个子节点使用同样的方式
      if (child2N < length) {
        const child2 = this.items[child2N];
        const child2Score = this.scoreFunction(child2);
        // 如果得分小于此时得分小的元素（前一次判断出来了），则需要交换为第二个子节点
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // 交换节点
      if (swap !== null) {
        this.items[n] = this.items[swap];
        this.items[swap] = element;
        n = swap;
      } else {
        break;
      }
    }
  }
}