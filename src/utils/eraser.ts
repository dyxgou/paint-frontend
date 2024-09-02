import { Tool, type ToolMethods } from "./tool";

class Eraser extends Tool implements ToolMethods {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx);
  }

  addEvents() {}
}

export default Eraser;
