"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryHeap {
    constructor(scoreFunction) {
        this.items = [];
        this.scoreFunction = scoreFunction;
    }
    push(node) {
        this.items.push(node);
        this.sinkDown(this.items.length - 1);
    }
    pop() {
        const first = this.items[0];
        const end = this.items.pop();
        if (this.items.length > 0) {
            this.items[0] = end;
            this.bubbleUp(0);
        }
        return first;
    }
    remove(node) {
        const i = this.items.indexOf(node);
        const end = this.items.pop();
        if (i !== this.items.length - 1) {
            this.items[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            }
            else {
                this.bubbleUp(i);
            }
        }
    }
    size() {
        return this.items.length;
    }
    rescoreElement(node) {
        this.sinkDown(this.items.indexOf(node));
    }
    sinkDown(n) {
        const element = this.items[n];
        while (n > 0) {
            const parentN = ((n + 1) >> 1) - 1;
            const parent = this.items[parentN];
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.items[parentN] = element;
                this.items[n] = parent;
                n = parentN;
            }
            else {
                break;
            }
        }
    }
    bubbleUp(n) {
        const length = this.items.length;
        const element = this.items[n];
        const elemScore = this.scoreFunction(element);
        while (true) {
            const child2N = (n + 1) << 1;
            const child1N = child2N - 1;
            let swap = null;
            let child1Score = 0;
            if (child1N < length) {
                const child1 = this.items[child1N];
                child1Score = this.scoreFunction(child1);
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }
            if (child2N < length) {
                const child2 = this.items[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }
            if (swap !== null) {
                this.items[n] = this.items[swap];
                this.items[swap] = element;
                n = swap;
            }
            else {
                break;
            }
        }
    }
}
exports.default = BinaryHeap;
