import { Tool, type ToolMethods } from "./tool";

class Drawer extends Tool implements ToolMethods {
  lastX?: number;
  lastY?: number;
  color?: string;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx);
  }

  setColor(color: string) {
    this.color = color;
    this.ctx.strokeStyle = color;
  }

  addEvents() {
    const onMouseDown = (event: MouseEvent) => {
      this.isDrawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!this.isDrawing) return;
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    };

    const onMouseUp = () => {
      this.isDrawing = false;
      this.ctx.closePath();
    };

    this.canvas.addEventListener("mousedown", onMouseDown);
    this.canvas.addEventListener("mousemove", onMouseMove);
    this.canvas.addEventListener("mouseup", onMouseUp);
    this.canvas.addEventListener("mouseleave", onMouseUp);
  }
}

export default Drawer;
