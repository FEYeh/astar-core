"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GridNode_1 = require("./GridNode");
const AStar_1 = require("./AStar");
class Graph {
    constructor(gridIn, options) {
        options = options || {};
        this.nodes = [];
        this.diagonal = !!options.diagonal;
        this.grid = [];
        for (let x = 0; x < gridIn.length; x++) {
            this.grid[x] = [];
            for (let y = 0, row = gridIn[x]; y < row.length; y++) {
                const node = new GridNode_1.default(x, y, row[y]);
                this.grid[x][y] = node;
                this.nodes.push(node);
            }
        }
        this.init();
    }
    init() {
        this.dirtyNodes = [];
        for (let i = 0; i < this.nodes.length; i++) {
            AStar_1.default.cleanNode(this.nodes[i]);
        }
    }
    cleanDirty() {
        for (let i = 0; i < this.dirtyNodes.length; i++) {
            AStar_1.default.cleanNode(this.dirtyNodes[i]);
        }
        this.dirtyNodes = [];
    }
    markDirty(node) {
        this.dirtyNodes.push(node);
    }
    neighbors(node) {
        const ret = [];
        const x = node.x;
        const y = node.y;
        const grid = this.grid;
        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y]);
        }
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y]);
        }
        if (grid[x] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1]);
        }
        if (grid[x] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1]);
        }
        if (this.diagonal) {
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                ret.push(grid[x - 1][y - 1]);
            }
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                ret.push(grid[x + 1][y - 1]);
            }
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                ret.push(grid[x - 1][y + 1]);
            }
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                ret.push(grid[x + 1][y + 1]);
            }
        }
        return ret;
    }
    toString() {
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
exports.default = Graph;
