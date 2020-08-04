import { Polyomino } from "../../src/core/models/polyomino";
import { incrementalPackImpl } from "../../src/core/packing";
import assert from "assert";

describe('incremental packing', () => {
    const gridStep = 10;

    it('should pack horizontally', () => {
        let polyominos = [
            new Polyomino(  0, 0, 50, 50, gridStep, 0),
            new Polyomino(110, 0, 50, 50, gridStep, 1),
        ];

        for (let poly of polyominos) {
            for (let col of poly.grid) {
                col.fill(true);
            }
        }

        let { shifts } = incrementalPackImpl(polyominos, gridStep);

        assert.strictEqual(shifts[0].dx, 30, "Must shift right 30 pixels");
        assert.strictEqual(shifts[1].dx, -30, "Must shift left 30 pixels");
    });

    it('should pack vertically', () => {
        let polyominos = [
            new Polyomino(0,   0, 50, 50, gridStep, 0),
            new Polyomino(0, 110, 50, 50, gridStep, 1),
        ];

        for (let poly of polyominos) {
            for (let col of poly.grid) {
                col.fill(true);
            }
        }

        let { shifts } = incrementalPackImpl(polyominos, gridStep);

        assert.strictEqual(shifts[0].dy, 30, "Must shift down 30 pixels ");
        assert.strictEqual(shifts[1].dy, -30, "Must shift up 30 pixels");
    });

    it('should pack all directions', () => {
        let polyominos = [
            new Polyomino(  0,   0, 50, 50, gridStep, 0),
            new Polyomino(  0, 110, 50, 50, gridStep, 1),
            new Polyomino(110,   0, 50, 50, gridStep, 2),
            new Polyomino(110, 110, 50, 50, gridStep, 3),
        ];

        for (let poly of polyominos) {
            for (let col of poly.grid) {
                col.fill(true);
            }
        }

        let { shifts } = incrementalPackImpl(polyominos, gridStep);

        assert.deepStrictEqual(shifts[0], { dx: 30, dy: 30 });
        assert.deepStrictEqual(shifts[1], { dx: 30, dy: -30 });
        assert.deepStrictEqual(shifts[2], { dx: -30, dy: 30 });
        assert.deepStrictEqual(shifts[3], { dx: -30, dy: -30 });
    });

    it('should pack horizontally incomplete objects', () => {
        let polyominos = [
            new Polyomino(  0, 0, 50, 50, gridStep, 0),
            new Polyomino(110, 0, 50, 50, gridStep, 1),
        ];

        // Fill as C shape
        for(let i = 0; i < polyominos[0].stepWidth; ++i) {
            // Up line
            polyominos[0].grid[i][0] = true;
            // Bottom line
            polyominos[0].grid[i][polyominos[0].stepHeight - 1] = true;
            // Same with the other polyomino
            polyominos[1].grid[i][0] = true;
            polyominos[1].grid[i][polyominos[0].stepHeight - 1] = true;
        }
        // Vertical line
        for (let i = 0; i < polyominos[0].stepHeight; ++i) {
            polyominos[0].grid[0][i] = true;
            polyominos[1].grid[polyominos[1].stepWidth - 1][i] = true;
        }

        let { shifts } = incrementalPackImpl(polyominos, gridStep);

        assert.strictEqual(shifts[0].dx, 30, "Must shift right 30 pixels");
        assert.strictEqual(shifts[1].dx, -30, "Must shift left 30 pixels");
    });

    it('should pack irregular objects', () => {
        let polyominos = [
            new Polyomino(0, 0, 40, 40, gridStep, 0),
            new Polyomino(40, 0, 40, 40, gridStep, 1),
        ];

        for (let poly of polyominos) {
            for (let col of poly.grid) {
                col.fill(true);
            }
        }

        let half = polyominos[0].stepWidth / 2;
        
        for (let i = 0; i < half; ++i) {
            for (let j = 0; j < half; ++j) {
                polyominos[0].grid[i + half][j + half] = false;
                polyominos[1].grid[i][j] = false;
            }
        }

        let { shifts } = incrementalPackImpl(polyominos, gridStep);

        assert.deepStrictEqual(shifts[0], { dx: 10, dy: 0 });
        assert.deepStrictEqual(shifts[1], { dx: -10, dy: 0 });
    });
});