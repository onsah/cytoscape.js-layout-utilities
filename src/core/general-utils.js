import { Point, Rectangle } from './models/common';

/**
 * a function to determine the grid cells where a line between point p0 and p1 pass through
 * @param { import('./typedef').IPoint } p0
 * @param { import('./typedef').IPoint } p1
 */
export function LineSuperCover(p0, p1) {
  var dx = p1.x - p0.x, dy = p1.y - p0.y;
  var nx = Math.floor(Math.abs(dx)), ny = Math.floor(Math.abs(dy));
  var sign_x = dx > 0 ? 1 : -1, sign_y = dy > 0 ? 1 : -1;

  var p = new Point(p0.x, p0.y);
  var points = [new Point(p.x, p.y)];
  for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
    if ((0.5 + ix) / nx == (0.5 + iy) / ny) {
      // next step is diagonal
      p.x += sign_x;
      p.y += sign_y;
      ix++;
      iy++;
    } else if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
      // next step is horizontal
      p.x += sign_x;
      ix++;
    } else {
      // next step is vertical
      p.y += sign_y;
      iy++;
    }
    points.push(new Point(p.x, p.y));
  }
  return points;
};

/**
 * finds the current center of components
 * @param { import('./typedef').Component[] } components 
 */
export function getCenter(components) {
  let bounds = components.flatMap(component => component.nodes)
    .map(node => ({
      left: node.x,
      top: node.y,
      right: node.x + node.width - 1,
      bottom: node.y + node.height - 1,
    }))
    .reduce((bounds, currNode) => ({
        left: Math.min(currNode.left, bounds.left),
        right: Math.max(currNode.right, bounds.right),
        top: Math.min(currNode.top, bounds.top),
        bottom: Math.max(currNode.bottom, bounds.bottom)
    }), {
      left: Number.MAX_VALUE,
      right: -Number.MAX_VALUE,
      top: Number.MAX_VALUE,
      bottom: -Number.MAX_VALUE
    });

  return new Point((bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2);
}

//
/**
 *  a function to remove duplicate object in array 
 * @param { any[] } ar 
 */
export function uniqueArray(ar) {
  /** @type any */
  var j = {};
  for (let v of ar) {
    j[v + '::' + typeof v] = v;
  }
  return Object.keys(j).map(function (v) {
    return j[v];
  });
}

/**
 * Calculates the bounding rectangle of a graph
 * @param { import('./typedef').Component } component 
 */
export function getBoundingRectangle(component) {
    let x1 = Number.MAX_VALUE, x2 = -Number.MAX_VALUE, y1 = Number.MAX_VALUE, y2 = -Number.MAX_VALUE;
    for (let node of component.nodes) {
      if (node.x <= x1) x1 = node.x;
      if (node.y <= y1) y1 = node.y;
      if ((node.x + node.width - 1) >= x2) x2 = (node.x + node.width - 1);
      if ((node.y + node.height - 1) >= y2) y2 = (node.y + node.height - 1);
    }

    for (let edge of component.edges) {
      if (edge.startX <= x1) x1 = edge.startX;
      if (edge.startY <= y1) y1 = edge.startY;
      if (edge.endX >= x2) x2 = edge.endX;
      if (edge.endY >= y2) y2 = edge.endY;
    }

    return new Rectangle(x1, y1, x2, y2);
}

/**
 * See: http://eugen.dedu.free.fr/projects/bresenham/
 * @param { import('./typedef').ILine } line 
 * @returns { import('./typedef').IPoint[] }
 */
export function betterLineSupercover(line) {
  let p = { x: line.min.x, y: line.min.y };
  let points = [ { x: p.x, y: p.y } ];

  let dx = line.max.x - line.min.x,
      dy = line.max.y - line.min.y,
      xStep = Math.sign(dx),
      yStep = Math.sign(dy);

  dx = Math.abs(dx);
  dy = Math.abs(dy);

  let ddx = 2 * dx, ddy = 2 * dy;

  if (ddx >= ddy) {
      let error = dx, errorprev = dx;

      for (let i = 0; i < dx; ++i) {
          p.x += xStep;
          error += ddy;

          if (error > ddx) {
              p.y += yStep;
              error -= ddx;

              if (error + errorprev < ddx) {
                  points.push({ x: p.x        , y: p.y - yStep });
              } else if (error + errorprev > ddx) {
                  points.push({ x: p.x - xStep, y: p.y         });
              } else {
                  points.push({ x: p.x        , y: p.y - yStep });
                  points.push({ x: p.x - xStep, y: p.y         });
              }
          }

          points.push({ x: p.x, y: p.y });
          errorprev = error;
      }
  } else {
      let error = dy, errorprev = dy;

      for (let i = 0; i < dy; ++i) {
          p.y += yStep;
          error += ddx;

          if (error > ddy) {
              p.x += xStep;
              error -= ddy;

              if (error + errorprev < ddy) {
                  points.push({ x: p.x - xStep, y: p.y         });
              } else if (error + errorprev > ddy) {
                  points.push({ x: p.x        , y: p.y - yStep });
              } else {
                  points.push({ x: p.x - xStep, y: p.y         });
                  points.push({ x: p.x        , y: p.y - yStep });
              }
          }

          points.push({ x: p.y, y: p.y });
          errorprev = error;
      }
  }

  return points;
} 