import assert from 'assert';
import { BoundingRectangle } from'../../src/core/polyomino-packing';

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
    });
});