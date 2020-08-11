import { QuadTree, Node } from "./quad-tree";
import { Polyomino } from "../models/polyomino";

/**
 * Extends QuadTree<Polyomino>
 * Uses optimized algorithm for finding polyominos at specific point
 * @extends { QuadTree<Polyomino> }
 */
export class PolyominoQuadTree extends QuadTree {

    /**
     * 
     * @param { number } y 
     * @param { number } x 
     */
    polyominoAt(y, x) {
        return polyominoAtImpl(this.mRoot, y, x);
    }    
}

/**
 * This is actually a bad design because it should be in quad tree but this is a special case for polyominos so it can't be included in QuadTree class
 * @param { Node<Polyomino> } node 
 * @param { number } y 
 * @param { number } x 
 * @returns { Polyomino | undefined }
 */
function polyominoAtImpl(node, y, x) {
        const values = node.mValues;
        const length = values.length;
        for (let i = 0; i < length; ++i) {
            const poly = values[i];
            if (poly.intoRectangle().contains(y, x) && poly.grid[x - poly.location.x][y - poly.location.y]) {
                return poly;
            }
        }

        if (!node.isLeaf) {
            for (let i = 0; i < node.mChildren.length; ++i) {
                let child = node.mChildren[i];
                // Some edge cases can fail so check if point can be multiple areas
                if (child.mRectangle.contains(y, x)) {
                    let result = polyominoAtImpl(child, y, x);
                    if (result !== undefined) {
                        return result;
                    }
                }
            }
        }

        return undefined;
    }