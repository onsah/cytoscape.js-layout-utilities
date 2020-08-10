import { QuadTree, Quadrant } from '../../../src/core/quad-tree/quad-tree';
import { Rectangle } from '../../../src/core/models/common.js';
import assert from 'assert';

describe('class QuadTree', () => {
    class Wrapper extends Rectangle {
        intoRectangle() {
            return this;
        }
    }

    it('Quadrant must have 4 values', () => {
        assert.strictEqual(Object.values(Quadrant).length ,4);
    });

    let area = new Rectangle(0, 0, 999, 999);
    /** @type { QuadTree<Wrapper> } */
    let quadTree = new QuadTree(area);
    /** @type { Wrapper[] } */
    let values = [];

    it('should not be leaf', () => {
        assert(quadTree.root.isLeaf, "Empty quad tree shold have leaf root");

        assert.strictEqual(quadTree.depth, 1);
    });

    it('should split', () => {
        const step = 50;

        for (let i = 0; i < 20; i += 1) {
            let value = new Wrapper(i * step, i * step, (i + 1) * step - 1, (i + 1) * step - 1);
            values.push(value);
            quadTree.add(value);
        }

        assert.strictEqual(quadTree.depth, 2);
        assert(!quadTree.root.isLeaf);
        assert.strictEqual(quadTree.root.mValues.length, 0, "Root must be empty");
        assert.strictEqual(quadTree.root.getChild(Quadrant.NW).mValues.length, 10);
        assert.strictEqual(quadTree.root.getChild(Quadrant.SE).mValues.length, 10);
    });

    it('should merge', () => {
        for (let i = 0; i < 20; i += 1) {
            quadTree.remove(values[i]);
        }

        assert.strictEqual(quadTree.depth, 1);
    });

    it('should split again', () => {
        for (let val of values) {
            quadTree.add(val);
        }

        assert.strictEqual(quadTree.depth, 2);
        assert(!quadTree.root.isLeaf);
        assert.strictEqual(quadTree.root.mValues.length, 0, "Root must be empty");
        assert.strictEqual(quadTree.root.getChild(Quadrant.NW).mValues.length, 10);
        assert.strictEqual(quadTree.root.getChild(Quadrant.SE).mValues.length, 10);
    });

    it('should find collisions', () => {
        let collisions = Array.from(quadTree.findCollisions(new Wrapper(0, 0, 149, 149)));

        assert.strictEqual(collisions.length, 3);

        collisions = Array.from(quadTree.findCollisions(new Wrapper(400, 400, 799, 799)));

        assert.strictEqual(collisions.length, 8);
    });

    it('should move', () => {
        assert.strictEqual(quadTree.root.mValues.length, 0);
        assert(!quadTree.root.isLeaf);

        let big = new Wrapper(250, 250, 499, 299);

        quadTree.add(big);

        // Move right so that it goes beyond NW
        assert(quadTree.move(big, { x: 200, y: 0 }));

        assert.strictEqual(quadTree.root.mValues.length, 1);

        // Move back to old place
        assert(quadTree.move(big, { x: -200, y: 0 }));

        assert.strictEqual(quadTree.root.mValues.length, 0);
        assert.strictEqual(quadTree.root.getChild(Quadrant.NW).mValues.length, 11);
    });

    it('point collision works', () => {
        let collisions = Array.from(quadTree.findCollisionsPoint({ x: 498, y: 298 }));

        assert.strictEqual(collisions.length, 1);
    })
});