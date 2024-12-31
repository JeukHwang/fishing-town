import { TownType } from "../type/region";

class GameMap {
  /**
   * Coordinate
   * -30: x
   * 90: y
   * 210: -(x+y)
   */
  constructor(public inner: number = 3, public outer: number = 8) {
    this.inner = inner;
    this.outer = outer;
  }

  static radius(x: number, y: number): number {
    return Math.abs(x) + Math.abs(y - x); /** */
  }

  getTown(x: number, y: number): TownType | null {
    if (GameMap.radius(x, y) > this.outer) return null;
    if (GameMap.radius(x, y) <= this.inner) return null;
    if (x > 0 && y >= 0) return "Wind";
    if (x <= 0 && x + y < 0) return "Turtle";
    return "Leaf";
  }
}
