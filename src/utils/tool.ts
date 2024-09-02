export abstract class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isDrawing: boolean;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isDrawing = false;
  }
}

export interface ToolMethods {
  addEvents: () => void;
  color?: string;
  setColor?: (color: string) => void;
}

export type ToolType = Tool & ToolMethods;
