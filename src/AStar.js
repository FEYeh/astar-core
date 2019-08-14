"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryHeap_1 = require("./BinaryHeap");
function pathTo(node) {
    let curr = node;
    const path = [];
    while (curr.parent) {
        path.unshift(curr);
        curr = curr.parent;
    }
    return path;
}
exports.Heuristics = {
    manhattan: function (pos0, pos1) {
        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    },
    diagonal: function (pos0, pos1) {
        var D = 1;
        var D2 = Math.sqrt(2);
        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
    }
};
class AStar {
    static cleanNode(node) {
        node.f = 0;
        node.g = 0;
        node.h = 0;
        node.visited = false;
        node.closed = false;
        node.parent = null;
    }
    static search(graph, start, end, options) {
        graph.cleanDirty();
        options = options || {};
        const heuristic = options.heuristic || exports.Heuristics.manhattan;
        const closest = options.closest || false;
        const openHeap = new BinaryHeap_1.default(function (node) {
            return node.f;
        });
        let closestNode = start;
        start.h = heuristic(start, end);
        graph.markDirty(start);
        openHeap.push(start);
        while (openHeap.size() > 0) {
            let currentNode = openHeap.pop();
            if (currentNode === end) {
                return pathTo(currentNode);
            }
            currentNode.closed = true;
            const neighbors = graph.neighbors(currentNode);
            for (var i = 0, il = neighbors.length; i < il; ++i) {
                const neighbor = neighbors[i];
                if (neighbor.closed || neighbor.isWall()) {
                    continue;
                }
                const gScore = currentNode.g + neighbor.getCost(currentNode);
                const beenVisited = neighbor.visited;
                if (!beenVisited || gScore < neighbor.g) {
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    graph.markDirty(neighbor);
                    if (closest) {
                        if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                            closestNode = neighbor;
                        }
                    }
                    if (!beenVisited) {
                        openHeap.push(neighbor);
                    }
                    else {
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }
        if (closest) {
            return pathTo(closestNode);
        }
        return [];
    }
}
exports.default = AStar;
