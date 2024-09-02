import type { ToolsKey } from "@/store/tools";
import type { ToolType } from "./tool";
import Drawer from "./drawer";
import Rectangle from "./rectangle";

class Canvas {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #tool: ToolsKey;
  #tools: Record<ToolsKey, ToolType>;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d")!;
    this.#tool = "draw";
    this.#tools = {
      draw: new Drawer(this.#canvas, this.#ctx),
      fill: new Drawer(this.#canvas, this.#ctx),
      erase: new Drawer(this.#canvas, this.#ctx),
      ellipse: new Drawer(this.#canvas, this.#ctx),
      picker: new Drawer(this.#canvas, this.#ctx),
      rectangle: new Rectangle(this.#canvas, this.#ctx),
      star: new Drawer(this.#canvas, this.#ctx),
      trash: new Drawer(this.#canvas, this.#ctx),
    };
  }

  resizeCanvas() {
    const canvasContainer = this.#canvas.parentElement;

    if (!canvasContainer) {
      return;
    }

    this.#canvas.width = canvasContainer.clientWidth;
    this.#canvas.height = canvasContainer.clientHeight;
  }

  setTool(tool: ToolsKey) {
    this.#tool = tool;
    this.#canvas.style.cursor = `url("/icons/${tool}.png") 19 21, auto`;
    this.#tools[this.#tool].addEvents();
  }

  setColor(color: string) {
    const currentTool = this.#tools[this.#tool];

    if (!currentTool.setColor) {
      return;
    }

    currentTool.setColor(color);
  }
}

export default Canvas;
