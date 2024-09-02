import { Tool, type ToolMethods } from "./tool";

class Rectangle extends Tool implements ToolMethods {
  #image?: ImageData;
  #startX?: number;
  #startY?: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx);
  }

  setColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  addEvents() {
    const onMouseDown = (event: MouseEvent) => {
      this.isDrawing = true;

      const { offsetX, offsetY } = event;
      this.#startX = offsetX;
      this.#startY = offsetY;

      this.#image = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!this.isDrawing) return;
      if (!this.#startX || !this.#startY) return;
      if (!this.#image) return;

      this.ctx.beginPath();

      const { offsetX, offsetY } = event;

      this.ctx.putImageData(this.#image, 0, 0);

      this.ctx.rect(
        this.#startX,
        this.#startY,
        offsetX - this.#startX,
        offsetY - this.#startY,
      );

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

export default Rectangle;
