/**
 * This file is used to declare type definitions
 */

/**
 * @typedef {{
 *  idealEdgeLength: number;
 *  offset: number;
 *  desiredAspectRatio: number;
 *  polyominoGridSizeFactor: number;
 *  utilityFunction: number;
 *  componentSpacing: number;
 *  randomize: boolean;
 * }} Options
 * 
 * @typedef {{
 *  x: number;
 *  y: number;
 *  width: number;
 *  height: number;
 * }} INode
 * 
 * @typedef {{
 *  startX: number;
 *  startY: number;
 *  endX: number;
 *  endY: number;
 * }} IEdge
 * 
 * @typedef {{
 *  nodes: INode[];
 *  edges: IEdge[];
 * }} Component
 * 
 * @typedef {{
 *  x1: number;
 *  x2: number;
 *  y1: number;
 *  y2: number;
 * }} IBoundingRectangle
 * 
 * @typedef {{
 *  x: number;
 *  y: number;
 * }} IPoint
 */

// To make the file module
export {};