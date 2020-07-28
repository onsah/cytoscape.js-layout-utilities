export class Options {
    constructor() {
        /** @type {number} */
        this.idealEdgeLength;
        /** @type {number} */
        this.offset;
        /** @type {number} */
        this.desiredAspectRatio;
        /** @type {number} */
        this.polyominoGridSizeFactor;
        /** @type {number} */
        this.utilityFunction;
        /** @type {number} */
        this.componentSpacing;
    }

    /**
     * @returns { Options }
     */
    static getDefault() {
        return {
            idealEdgeLength: 50,
            offset: 20,
            desiredAspectRatio: 1,
            polyominoGridSizeFactor: 1,
            utilityFunction: 1,  // Maximize adjusted Fullness   2: maximizes weighted function of fullness and aspect ratio
            componentSpacing: 30
        };
    }
}

class Node {
    constructor() {
        /** @type { number } */
        this.x = 0;
        /** @type { number } */
        this.y = 0;
        /** @type { number } */
        this.width = 0;
        /** @type { number } */
        this.height = 0;
    }
}

class Edge {
    constructor() {
        /** @type { number } */
        this.startX;
        /** @type { number } */
        this.startY;
        /** @type { number } */
        this.endX;
        /** @type { number } */
        this.endY;
    }
}

export class Component {
    constructor() {
        /** @type { Node[] } */
        this.nodes;
        /** @type { Edge[] } */
        this.edges;
    }
} 