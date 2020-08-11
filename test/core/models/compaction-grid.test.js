import { Polyomino } from "../../../src/core/models/polyomino";
import assert from "assert";
import { Rectangle } from "../../../src/core/models/common";
import { CompactionGrid, Direction } from "../../../src/core/models/compaction/compaction-grid";

describe('class CompactionGrid', () => {
    it('should calculate grid area', () => {
        let gridStep = 10;

        // TODO: make test asymmetric
        let polyominos = [
            new Polyomino(100, 100, 100, 100, gridStep, 0),
            new Polyomino(0, 0, 100, 100, gridStep, 1),
            new Polyomino(0, 100, 100, 100, gridStep, 2),
        ];

        for (let i = 0; i < 10; ++i) {
            // Horizontal line
            polyominos[0].grid[i][0] = true;
            // Vertical line
            polyominos[1].grid[9][i] = true;
            // Diagonal
            polyominos[2].grid[i][i] = true;
        }

        let compactionGrid = new CompactionGrid(polyominos, gridStep);

        assert.strictEqual(compactionGrid.width, Math.floor(200 / gridStep), "dimensions are wrong");
        assert.strictEqual(compactionGrid.height, Math.floor(200 / gridStep), "dimensions are wrong");
    });

    const gridStep = 10;

    const polyominos = [
        new Polyomino(0, 0, 50, 50, gridStep, 0),
        new Polyomino(100, 0, 50, 50, gridStep, 1),
    ];

    // Fill the first polyomino
    for (let col of polyominos[0].grid) {
        col.fill(true);
    }
    for (let col of polyominos[1].grid) {
        col.fill(true);
    }

    it('should compact left', () => {
        let compactionGrid = new CompactionGrid(polyominos, gridStep);
        
        for (let i = 0; i < 5; ++i) {
            assert(compactionGrid.tryCompact(Direction.LEFT), `Compaction: ${i}`);
            assert.strictEqual(compactionGrid.compactingBounds.x1, (i + 1), `Compaction ${i}`);
        }

        assert.deepStrictEqual(polyominos[0].intoRectangle(), new Rectangle(5, 0, 9, 4));
        // assert.deepStrictEqual(compactionGrid.quadTree.findCollisionsPoint({ x: 5, y: 1 }), [ polyominos[0] ]);
        assert(!compactionGrid.tryCompact(Direction.LEFT), `Shouldn't compact`);
        assert.strictEqual(compactionGrid.compactingBounds.x1, 5);

        assert(!compactionGrid.tryCompact(Direction.LEFT), `Shouldn't compact`);
    });

    it('shouldn\'t compact part of an object', () => {
        let polyominos = [
            new Polyomino(0, 0, 150, 50, gridStep, 0),
        ];

        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < 5; j += 1) {
                polyominos[0].grid[i][j] = true;
                polyominos[0].grid[i + 10][j] = true;
            }
        }

        let compactionGrid = new CompactionGrid(polyominos, gridStep);

        assert(!compactionGrid.tryCompact(Direction.LEFT), 'Shouldn\'t compact');
        assert(!compactionGrid.tryCompact(Direction.TOP), 'Shouldn\'t compact');
        assert(!compactionGrid.tryCompact(Direction.RIGHT), 'Shouldn\'t compact');
        assert(!compactionGrid.tryCompact(Direction.BOTTOM), 'Shouldn\'t compact');
    })
});