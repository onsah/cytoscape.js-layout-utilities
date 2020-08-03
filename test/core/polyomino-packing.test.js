import assert from 'assert';
import { BoundingRectangle, Polyomino } from'../../src/core/polyomino-packing';

describe('class BoundingRectangle', () => {
    it('checks include', () => {
        let br = new BoundingRectangle(
            Number.MAX_VALUE, Number.MAX_VALUE,
            -Number.MAX_VALUE, -Number.MAX_VALUE
        );

        let other = { x1: 50, y1: 0, x2: 100, y2: 100 };

        br.include(other);

        assert.strictEqual(br.x1, other.x1);
        assert.strictEqual(br.x2, other.x2);
        assert.strictEqual(br.y1, other.y1);
        assert.strictEqual(br.y2, other.y2);

        other = { x1: -100, y1: -100, x2: 0, y2: 0 };

        br.include(other);

        assert.strictEqual(br.x1, other.x1);
        assert.strictEqual(br.x2, 100);
        assert.strictEqual(br.y1, other.y1);
        assert.strictEqual(br.y2, 100);
    });
});

describe('class Polyomino', () => {
    it('checks coordinate functions', () => {
        let poly = new Polyomino(105, 105, 94, 94, 20, 0);

        assert.strictEqual(poly.x1, 105);
        assert.strictEqual(poly.x2, 198);
        assert.strictEqual(poly.y1, 105);
        assert.strictEqual(poly.y2, 198);
        assert.strictEqual(poly.stepX1, 5);
        assert.strictEqual(poly.stepX2, 9);
        assert.strictEqual(poly.stepY1, 5);
        assert.strictEqual(poly.stepY2, 9);

        poly.x1 += 40;

        assert.strictEqual(poly.stepX1, 7);
        assert.strictEqual(poly.x2, 238);
        assert.strictEqual(poly.stepX2, 11);
    });

    it('checks dimensions', () => {
        const gridStep = 10;
        let poly = new Polyomino(0, 0, 50, 50, gridStep, 0);

        assert.strictEqual(poly.stepWidth, 5);
        assert.strictEqual(poly.stepHeight, 5);
    });
});